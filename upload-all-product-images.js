// Upload all product images to Shopify from local files
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
  // Cheeky products (already uploaded)
  'Double Bagel Thong': 'double-bagel-thong.jpg',
  'Bagel Buns Booty Shorts': 'bagel-buns-shorts.jpg',
  'Love-0 Boxer Briefs': 'love-0-boxers.jpg',
  '6-0 and Loving It Trucker Hat': 'loving-it-hat.jpg',
  'Court Jester Crew Socks': 'court-jester-socks.jpg',
  // Original products (need images)
  // 'The Bagel Tee': 'bagel-tee.jpg',
  // 'The 6-0 Hoodie': '6-0-hoodie.jpg',
  // 'Bageled Cap': 'bageled-cap.jpg',
  // 'Court Joggers': 'court-joggers.jpg',
  // '6-0 Sticker Pack': 'sticker-pack.jpg',
};

async function getProducts() {
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-01/products.json`, {
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
  });
  return response.json();
}

async function getProductImages(productId) {
  const response = await fetch(
    `https://${SHOPIFY_DOMAIN}/admin/api/2024-01/products/${productId}/images.json`,
    {
      headers: {
        'X-Shopify-Access-Token': ADMIN_TOKEN,
      },
    }
  );
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
  console.log('📸 Checking and uploading product images\n');

  const data = await getProducts();
  const products = data.products || [];

  console.log(`Found ${products.length} total products\n`);

  for (const [productTitle, imageFile] of Object.entries(productImages)) {
    const product = products.find(p => p.title === productTitle);

    if (!product) {
      console.log(`❌ Product not found: ${productTitle}`);
      continue;
    }

    console.log(`📦 ${productTitle}`);

    // Check if product already has images
    const imagesData = await getProductImages(product.id);
    const existingImages = imagesData.images || [];

    if (existingImages.length > 0) {
      console.log(`   ℹ️  Already has ${existingImages.length} image(s) - skipping`);
      continue;
    }

    // Read local image file and convert to base64
    const imagePath = path.join(__dirname, 'public', 'images', 'products', imageFile);

    if (!fs.existsSync(imagePath)) {
      console.log(`   ⚠️  Image file not found: ${imageFile} - skipping`);
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

  console.log('\n✅ Done checking all products!');
}

main().catch(console.error);
