// Upload product images to Shopify from local files
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

// Map product titles to local image files
const productImages = {
  'Double Bagel Thong': 'double-bagel-thong.jpg',
  'Bagel Buns Booty Shorts': 'bagel-buns-shorts.jpg',
  'Love-0 Boxer Briefs': 'love-0-boxers.jpg',
  '6-0 and Loving It Trucker Hat': 'loving-it-hat.jpg',
  'Court Jester Crew Socks': 'court-jester-socks.jpg',
};

async function getProducts() {
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-01/products.json`, {
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
  });
  return response.json();
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
        image: {
          attachment: imageBase64,
          filename: filename,
        },
      }),
    }
  );

  return response.json();
}

async function main() {
  console.log('📸 Uploading product images to Shopify from local files\n');

  const data = await getProducts();
  const products = data.products || [];

  for (const [productTitle, imageFile] of Object.entries(productImages)) {
    const product = products.find(p => p.title === productTitle);

    if (!product) {
      console.log(`❌ Product not found: ${productTitle}`);
      continue;
    }

    console.log(`📦 ${productTitle}`);

    // Read local image file and convert to base64
    const imagePath = path.join(__dirname, 'public', 'images', 'products', imageFile);

    if (!fs.existsSync(imagePath)) {
      console.log(`   ❌ Image file not found: ${imagePath}`);
      continue;
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString('base64');

    console.log(`   Uploading ${imageFile} (${Math.round(imageBuffer.length / 1024)}KB)...`);

    const result = await addImageToProduct(product.id, imageBase64, imageFile);

    if (result.image) {
      console.log(`   ✅ Image uploaded!`);
    } else {
      console.log(`   ❌ Failed:`, result.errors || result);
    }

    // Rate limit: wait 500ms between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n✅ Done uploading images!');
}

main().catch(console.error);
