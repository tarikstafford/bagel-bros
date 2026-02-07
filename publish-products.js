// Publish products to Online Store sales channel
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const [key, ...valueParts] = trimmed.split('=');
  env[key.trim()] = valueParts.join('=').trim();
});

const DOMAIN = env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const ADMIN_TOKEN = env.SHOPIFY_ADMIN_ACCESS_TOKEN;

async function getProducts() {
  const response = await fetch(`https://${DOMAIN}/admin/api/2024-01/products.json`, {
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
  });
  return response.json();
}

async function publishProduct(productId) {
  // Publish to Online Store
  const response = await fetch(`https://${DOMAIN}/admin/api/2024-01/products/${productId}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
    body: JSON.stringify({
      product: {
        id: productId,
        published: true,
        published_scope: 'web',
      },
    }),
  });
  return response.json();
}

async function main() {
  console.log('🔍 Fetching products from Admin API...\n');

  const data = await getProducts();
  const products = data.products || [];

  console.log(`Found ${products.length} products in Admin API\n`);

  const bagelProducts = products.filter(p =>
    p.tags && p.tags.includes('drop-001')
  );

  console.log(`${bagelProducts.length} products have 'drop-001' tag:\n`);

  for (const product of bagelProducts) {
    console.log(`📦 ${product.title}`);
    console.log(`   ID: ${product.id}`);
    console.log(`   Published: ${product.published_at ? 'Yes' : 'No'}`);
    console.log(`   Status: ${product.status}`);

    if (!product.published_at || product.status !== 'active') {
      console.log(`   ⚠️  Publishing to Online Store...`);
      await publishProduct(product.id);
      console.log(`   ✅ Published!`);
    }
    console.log('');

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n✅ All drop-001 products are now published!');
  console.log('\nNext: Refresh your browser and check http://localhost:3000/shop');
}

main().catch(console.error);
