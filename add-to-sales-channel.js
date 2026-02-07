// Add products to Online Store sales channel using GraphQL
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

async function getPublications() {
  const query = `
    query {
      publications(first: 10) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `;

  const response = await fetch(`https://${DOMAIN}/admin/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
    body: JSON.stringify({ query }),
  });

  return response.json();
}

async function getProducts() {
  const response = await fetch(`https://${DOMAIN}/admin/api/2024-01/products.json?fields=id,title,tags`, {
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
  });
  return response.json();
}

async function publishToChannel(productId, publicationId) {
  const mutation = `
    mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
      publishablePublish(id: $id, input: $input) {
        publishable {
          publishedOnCurrentPublication
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    id: productId,
    input: [{ publicationId }],
  };

  const response = await fetch(`https://${DOMAIN}/admin/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  return response.json();
}

async function main() {
  console.log('🔍 Getting sales channels...\n');

  const pubData = await getPublications();
  const publications = pubData.data?.publications?.edges || [];

  console.log('Available sales channels:');
  publications.forEach(({ node }) => {
    console.log(`  - ${node.name} (${node.id})`);
  });

  const onlineStore = publications.find(({ node }) =>
    node.name.toLowerCase().includes('online store')
  );

  if (!onlineStore) {
    console.error('\n❌ Could not find Online Store publication');
    return;
  }

  console.log(`\n✅ Using: ${onlineStore.node.name}\n`);
  console.log('🔍 Getting products...\n');

  const productsData = await getProducts();
  const products = productsData.products || [];
  const bagelProducts = products.filter(p => p.tags && p.tags.includes('drop-001'));

  console.log(`Found ${bagelProducts.length} products with drop-001 tag\n`);

  for (const product of bagelProducts) {
    console.log(`📦 Publishing: ${product.title}`);
    const globalId = `gid://shopify/Product/${product.id}`;

    const result = await publishToChannel(globalId, onlineStore.node.id);

    if (result.data?.publishablePublish?.userErrors?.length > 0) {
      console.log(`   ❌ Error:`, result.data.publishablePublish.userErrors);
    } else {
      console.log(`   ✅ Published to Online Store`);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n✅ Done! Wait 30 seconds then refresh your browser.');
}

main().catch(console.error);
