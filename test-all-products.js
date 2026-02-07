// Check ALL products to see what's in the store
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
const TOKEN = env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const query = `
  query {
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          tags
          publishedAt
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
    console.log('📦 ALL Products in Store:\n');

    const products = data.data?.products?.edges || [];
    console.log(`Total products: ${products.length}\n`);

    products.forEach(({ node }, i) => {
      console.log(`${i + 1}. ${node.title}`);
      console.log(`   Handle: ${node.handle}`);
      console.log(`   Tags: ${node.tags.join(', ')}`);
      console.log(`   Published: ${node.publishedAt}`);
      console.log('');
    });

    if (products.length === 0) {
      console.log('⚠️  No products found! Products may not be published to the Online Store channel.');
    }
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
  });
