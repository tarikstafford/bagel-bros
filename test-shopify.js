// Quick test to check if Shopify products are accessible
const fs = require('fs');

// Read env
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const [key, ...valueParts] = trimmed.split('=');
  env[key.trim()] = valueParts.join('=').trim();
});

const DOMAIN = env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const TOKEN = env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const query = `
  query {
    products(first: 10, query: "tag:drop-001") {
      edges {
        node {
          id
          title
          handle
          tags
        }
      }
    }
  }
`;

fetch(`https://${DOMAIN}/api/2024-01/graphql.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': TOKEN,
  },
  body: JSON.stringify({ query }),
})
  .then(res => res.json())
  .then(data => {
    console.log('✅ Shopify API Response:');
    console.log(JSON.stringify(data, null, 2));

    const products = data.data?.products?.edges || [];
    console.log(`\n📦 Found ${products.length} products with tag "drop-001"`);
    products.forEach(({ node }) => {
      console.log(`  - ${node.title}`);
    });
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
  });
