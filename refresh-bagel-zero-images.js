// Refresh images for 6-0 products with bagel zeros
const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const [key, ...valueParts] = trimmed.split('=');
  env[key.trim()] = valueParts.join('=').trim();
});

const SHOPIFY_DOMAIN = env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = env.SHOPIFY_ADMIN_ACCESS_TOKEN;

const productImages = {
  'The Bagel Tee': 'bagel-tee.jpg',
  'The 6-0 Hoodie': '6-0-hoodie.jpg',
  '6-0 and Loving It Trucker Hat': 'loving-it-hat.jpg',
  '6-0 Sticker Pack': 'sticker-pack.jpg',
};

async function getProducts() {
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-01/products.json`, {
    headers: { 'X-Shopify-Access-Token': ADMIN_TOKEN },
  });
  return response.json();
}

async function getProductImages(productId) {
  const response = await fetch(
    `https://${SHOPIFY_DOMAIN}/admin/api/2024-01/products/${productId}/images.json`,
    { headers: { 'X-Shopify-Access-Token': ADMIN_TOKEN } }
  );
  return response.json();
}

async function deleteImage(productId, imageId) {
  const response = await fetch(
    `https://${SHOPIFY_DOMAIN}/admin/api/2024-01/products/${productId}/images/${imageId}.json`,
    {
      method: 'DELETE',
      headers: { 'X-Shopify-Access-Token': ADMIN_TOKEN },
    }
  );
  return response.ok;
}

async function addImageToProduct(productId, imageBase64, filename) {
  const response = await fetch(
    `https://${SHOPIFY_DOMAIN}/admin/api/2024-01/products/${productId}/images.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ADMIN_TOKEN,
      },
      body: JSON.stringify({
        image: { attachment: imageBase64, filename: filename },
      }),
    }
  );
  return response.json();
}

async function main() {
  console.log('🥯 Refreshing bagel zero images\n');

  const data = await getProducts();
  const products = data.products || [];

  for (const [productTitle, imageFile] of Object.entries(productImages)) {
    const product = products.find(p => p.title === productTitle);
    if (!product) continue;

    console.log(`📦 ${productTitle}`);

    // Delete old images
    const imagesData = await getProductImages(product.id);
    for (const img of imagesData.images || []) {
      console.log(`   🗑️  Deleting old image...`);
      await deleteImage(product.id, img.id);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Upload new image
    const imagePath = path.join(__dirname, 'public', 'images', 'products', imageFile);
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString('base64');
    console.log(`   📤 Uploading new bagel zero image (${Math.round(imageBuffer.length / 1024)}KB)...`);

    const result = await addImageToProduct(product.id, imageBase64, imageFile);
    if (result.image) {
      console.log(`   ✅ Uploaded!\n`);
    } else {
      console.log(`   ❌ Failed\n`);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('✅ Done! Wait 30 seconds then hard refresh to see the bagel zeros with sugar glaze! 🥯✨');
}

main().catch(console.error);
