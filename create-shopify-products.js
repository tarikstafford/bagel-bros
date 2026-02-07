/**
 * Shopify Product Creation Script (REST API)
 * Creates all Drop 001 products via Admin REST API
 *
 * Usage: node create-shopify-products.js
 */

const fs = require('fs');
const path = require('path');

// Read .env.local file
function loadEnv() {
  const envPath = path.join(__dirname, '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('❌ Error: .env.local file not found');
    process.exit(1);
  }

  const envFile = fs.readFileSync(envPath, 'utf8');
  const env = {};

  envFile.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const [key, ...valueParts] = trimmed.split('=');
    const value = valueParts.join('=').trim();
    env[key.trim()] = value;
  });

  return env;
}

const env = loadEnv();
const SHOPIFY_DOMAIN = env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = env.SHOPIFY_ADMIN_ACCESS_TOKEN;

if (!SHOPIFY_DOMAIN || !ADMIN_TOKEN) {
  console.error('❌ Error: Missing Shopify credentials in .env.local');
  console.error('Required: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and SHOPIFY_ADMIN_ACCESS_TOKEN');
  process.exit(1);
}

const ADMIN_API_URL = `https://${SHOPIFY_DOMAIN}/admin/api/2024-01/products.json`;

// Product data
const products = [
  {
    title: 'The Bagel Tee',
    body_html: '<p>Getting bageled never looked this good.</p><p>Our signature tee for the 6-0 Club. Premium heavyweight cotton with a minimalist bagel logo. For those who show up, get demolished, and come back with a smile.</p><ul><li>100% premium heavyweight cotton (6.5 oz)</li><li>Screen-printed logo, water-based ink</li><li>Pre-shrunk, true to size</li><li>Ribbed crew neck</li><li>Made for losing in style</li></ul><p>Limited quantities. No restocks.</p>',
    vendor: 'Bagel Bros',
    product_type: 'T-Shirt',
    tags: 'drop-001, apparel, tee, core',
    status: 'active',
    options: [{ name: 'Size' }],
    variants: [
      { option1: 'S', price: '45.00', compare_at_price: '65.00', sku: 'BB-TEE-BLK-S', inventory_quantity: 20, weight: 0.3, weight_unit: 'lb' },
      { option1: 'M', price: '45.00', compare_at_price: '65.00', sku: 'BB-TEE-BLK-M', inventory_quantity: 30, weight: 0.3, weight_unit: 'lb' },
      { option1: 'L', price: '45.00', compare_at_price: '65.00', sku: 'BB-TEE-BLK-L', inventory_quantity: 30, weight: 0.3, weight_unit: 'lb' },
      { option1: 'XL', price: '45.00', compare_at_price: '65.00', sku: 'BB-TEE-BLK-XL', inventory_quantity: 20, weight: 0.3, weight_unit: 'lb' },
    ],
  },
  {
    title: 'The 6-0 Hoodie',
    body_html: '<p>Warmth for the eternally defeated.</p><p>Premium heavyweight hoodie for post-match recovery. Oversized fit, brutalist logo placement, maximum comfort for maximum losses.</p><ul><li>450 GSM heavyweight French terry cotton</li><li>Oversized, boxy fit</li><li>Embroidered chest logo + back graphic</li><li>Double-lined hood with tonal drawstrings</li><li>Kangaroo pocket</li><li>Ribbed cuffs and hem</li></ul><p>Limited quantities, no restocks.</p>',
    vendor: 'Bagel Bros',
    product_type: 'Hoodie',
    tags: 'drop-001, apparel, hoodie, core',
    status: 'active',
    options: [{ name: 'Size' }],
    variants: [
      { option1: 'S', price: '95.00', compare_at_price: '135.00', sku: 'BB-HOOD-BLK-S', inventory_quantity: 15, weight: 1.2, weight_unit: 'lb' },
      { option1: 'M', price: '95.00', compare_at_price: '135.00', sku: 'BB-HOOD-BLK-M', inventory_quantity: 25, weight: 1.2, weight_unit: 'lb' },
      { option1: 'L', price: '95.00', compare_at_price: '135.00', sku: 'BB-HOOD-BLK-L', inventory_quantity: 25, weight: 1.2, weight_unit: 'lb' },
      { option1: 'XL', price: '95.00', compare_at_price: '135.00', sku: 'BB-HOOD-BLK-XL', inventory_quantity: 15, weight: 1.2, weight_unit: 'lb' },
    ],
  },
  {
    title: 'Bageled Cap',
    body_html: '<p>Top off your look. Bottom out your scoreline.</p><p>Six-panel unstructured cap with embroidered bagel logo. Perfect for blocking out the sun (and the scoreboard).</p><ul><li>100% premium cotton twill</li><li>Six-panel unstructured crown</li><li>Embroidered 3D logo</li><li>Adjustable metal buckle closure</li><li>Pre-curved brim</li></ul><p>One size fits all defeats.</p>',
    vendor: 'Bagel Bros',
    product_type: 'Hat',
    tags: 'drop-001, accessories, headwear, cap',
    status: 'active',
    options: [{ name: 'Size' }],
    variants: [
      { option1: 'One Size', price: '38.00', compare_at_price: '55.00', sku: 'BB-CAP-BLK-OS', inventory_quantity: 50, weight: 0.2, weight_unit: 'lb' },
    ],
  },
  {
    title: 'Court Joggers',
    body_html: '<p>Lose in comfort. Recover in style.</p><p>Premium athletic joggers built for the warm-up, the game, and the post-match debrief. Tapered fit, zippered pockets, subtle branding.</p><ul><li>320 GSM cotton/poly blend (80/20)</li><li>Tapered athletic fit</li><li>Zippered side pockets</li><li>Elastic waistband with drawstring</li><li>Ribbed ankle cuffs</li><li>Embroidered logo on thigh</li></ul><p>Perfect for court or couch.</p>',
    vendor: 'Bagel Bros',
    product_type: 'Bottoms',
    tags: 'drop-001, apparel, bottoms, joggers',
    status: 'active',
    options: [{ name: 'Size' }],
    variants: [
      { option1: 'S', price: '78.00', compare_at_price: '110.00', sku: 'BB-JOG-BLK-S', inventory_quantity: 15, weight: 0.8, weight_unit: 'lb' },
      { option1: 'M', price: '78.00', compare_at_price: '110.00', sku: 'BB-JOG-BLK-M', inventory_quantity: 25, weight: 0.8, weight_unit: 'lb' },
      { option1: 'L', price: '78.00', compare_at_price: '110.00', sku: 'BB-JOG-BLK-L', inventory_quantity: 25, weight: 0.8, weight_unit: 'lb' },
      { option1: 'XL', price: '78.00', compare_at_price: '110.00', sku: 'BB-JOG-BLK-XL', inventory_quantity: 15, weight: 0.8, weight_unit: 'lb' },
    ],
  },
  {
    title: '6-0 Sticker Pack',
    body_html: '<p>Rep the score everywhere.</p><p>Three premium vinyl stickers featuring the iconic 6-0 scoreline and bagel graphics.</p><ul><li>Pack of 3 die-cut vinyl stickers</li><li>Weather-resistant, UV-coated</li><li>Sizes: 3" circle, 2x4" rectangle, 3" bagel</li><li>Matte finish</li></ul><p>Lose the match. Win the aesthetic.</p>',
    vendor: 'Bagel Bros',
    product_type: 'Accessories',
    tags: 'drop-001, accessories, stickers, add-on',
    status: 'active',
    options: [{ name: 'Size' }],
    variants: [
      { option1: 'One Size', price: '12.00', compare_at_price: '18.00', sku: 'BB-STICK-PACK-OS', inventory_quantity: 100, weight: 0.05, weight_unit: 'lb' },
    ],
  },
];

async function createProduct(product) {
  try {
    const response = await fetch(ADMIN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ADMIN_TOKEN,
      },
      body: JSON.stringify({ product }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(`❌ HTTP Error ${response.status} for "${product.title}":`, result);
      return false;
    }

    if (result.errors) {
      console.error(`❌ Errors for "${product.title}":`, result.errors);
      return false;
    }

    if (result.product) {
      console.log(`✅ Created: ${product.title} (${product.variants.length} variants)`);
      return true;
    }

    console.error(`❌ Unexpected response for "${product.title}":`, result);
    return false;
  } catch (error) {
    console.error(`❌ Error creating "${product.title}":`, error.message);
    return false;
  }
}

async function main() {
  console.log('🥯 Bagel Bros - Creating Drop 001 Products\n');
  console.log(`📍 Store: ${SHOPIFY_DOMAIN}`);
  console.log(`📦 Products to create: ${products.length}\n`);

  let successCount = 0;
  let failCount = 0;

  for (const product of products) {
    const success = await createProduct(product);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    // Rate limit: wait 0.5s between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Successfully created: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);

  if (successCount === products.length) {
    console.log('\n🎉 All products created successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Add product images in Shopify Admin');
    console.log('2. Set NEXT_PUBLIC_DROP_MODE=live in .env.local');
    console.log('3. Restart dev server: npm run dev');
    console.log('4. Visit: http://localhost:3000/shop');
  } else if (successCount > 0) {
    console.log(`\n✅ ${successCount} products created successfully!`);
    console.log('\n📝 Next steps:');
    console.log('1. Check Shopify Admin for created products');
    console.log('2. Add product images');
    console.log('3. Manually add failed products if needed');
  } else {
    console.log('\n⚠️  No products were created. Check errors above.');
  }
}

main().catch(console.error);
