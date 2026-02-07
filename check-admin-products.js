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

async function checkProducts() {
  const response = await fetch(`https://${DOMAIN}/admin/api/2024-01/products.json?status=active&limit=250`, {
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
  });

  const data = await response.json();
  const products = data.products || [];

  console.log(`📦 Total active products in Admin API: ${products.length}\n`);

  products.forEach(p => {
    console.log(`- ${p.title} (ID: ${p.id})`);
    console.log(`  Status: ${p.status}`);
    console.log(`  Published: ${p.published_at ? 'Yes' : 'No'}`);
    console.log(`  Images: ${p.images?.length || 0}`);
    console.log('');
  });
}

checkProducts().catch(console.error);
