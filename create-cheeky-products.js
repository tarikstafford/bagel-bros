// Create cheeky Bagel Bros products
const fs = require('fs');

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
const ADMIN_API_URL = `https://${SHOPIFY_DOMAIN}/admin/api/2024-01/products.json`;

const products = [
  {
    title: 'Double Bagel Thong',
    body_html: '<p>For those who wear their losses with pride.</p><p>Athletic thong featuring two minimalist bagel circles strategically placed where it counts. Because getting bageled never looked this good.</p><ul><li>Premium athletic fabric</li><li>Two bagel circle graphics</li><li>Moisture-wicking</li><li>Perfect for victory... or defeat</li></ul><p><strong>Warning:</strong> May cause uncontrollable confidence despite 6-0 scorelines.</p>',
    vendor: 'Bagel Bros',
    product_type: 'Underwear',
    tags: 'drop-001, cheeky, underwear, bestseller',
    status: 'active',
    options: [{ name: 'Size' }],
    variants: [
      { option1: 'S', price: '28.00', compare_at_price: '40.00', sku: 'BB-THONG-BLK-S', inventory_quantity: 25, weight: 0.1, weight_unit: 'lb' },
      { option1: 'M', price: '28.00', compare_at_price: '40.00', sku: 'BB-THONG-BLK-M', inventory_quantity: 40, weight: 0.1, weight_unit: 'lb' },
      { option1: 'L', price: '28.00', compare_at_price: '40.00', sku: 'BB-THONG-BLK-L', inventory_quantity: 35, weight: 0.1, weight_unit: 'lb' },
      { option1: 'XL', price: '28.00', compare_at_price: '40.00', sku: 'BB-THONG-BLK-XL', inventory_quantity: 20, weight: 0.1, weight_unit: 'lb' },
    ],
  },
  {
    title: 'Bagel Buns Booty Shorts',
    body_html: '<p>Buns of steel? More like buns of... bagels.</p><p>Ultra-short athletic shorts with "BAGEL BUNS" boldly printed on the back waistband. For those who squat through the pain of defeat.</p><ul><li>4-way stretch fabric</li><li>Cheeky fit (obviously)</li><li>Sweat-wicking</li><li>Built-in liner</li><li>Bold waistband text</li></ul><p>Lose the match. Win the post-game.</p>',
    vendor: 'Bagel Bros',
    product_type: 'Shorts',
    tags: 'drop-001, cheeky, activewear, shorts',
    status: 'active',
    options: [{ name: 'Size' }],
    variants: [
      { option1: 'XS', price: '42.00', compare_at_price: '60.00', sku: 'BB-BUNS-BLK-XS', inventory_quantity: 20, weight: 0.2, weight_unit: 'lb' },
      { option1: 'S', price: '42.00', compare_at_price: '60.00', sku: 'BB-BUNS-BLK-S', inventory_quantity: 30, weight: 0.2, weight_unit: 'lb' },
      { option1: 'M', price: '42.00', compare_at_price: '60.00', sku: 'BB-BUNS-BLK-M', inventory_quantity: 35, weight: 0.2, weight_unit: 'lb' },
      { option1: 'L', price: '42.00', compare_at_price: '60.00', sku: 'BB-BUNS-BLK-L', inventory_quantity: 25, weight: 0.2, weight_unit: 'lb' },
    ],
  },
  {
    title: 'Love-0 Boxer Briefs',
    body_html: '<p>Love means nothing in tennis. Perfect for us.</p><p>Premium boxer briefs with "LOVE-0" tennis score on the waistband. A constant reminder that we start every match already losing.</p><ul><li>Premium cotton blend</li><li>Tagless comfort</li><li>Performance waistband</li><li>Tennis score graphic</li><li>Anti-chafe technology</li></ul><p>For those who serve aces in life, bagels on court.</p>',
    vendor: 'Bagel Bros',
    product_type: 'Underwear',
    tags: 'drop-001, cheeky, underwear, mens',
    status: 'active',
    options: [{ name: 'Size' }],
    variants: [
      { option1: 'S', price: '32.00', compare_at_price: '45.00', sku: 'BB-LOVE0-BLK-S', inventory_quantity: 20, weight: 0.15, weight_unit: 'lb' },
      { option1: 'M', price: '32.00', compare_at_price: '45.00', sku: 'BB-LOVE0-BLK-M', inventory_quantity: 35, weight: 0.15, weight_unit: 'lb' },
      { option1: 'L', price: '32.00', compare_at_price: '45.00', sku: 'BB-LOVE0-BLK-L', inventory_quantity: 35, weight: 0.15, weight_unit: 'lb' },
      { option1: 'XL', price: '32.00', compare_at_price: '45.00', sku: 'BB-LOVE0-BLK-XL', inventory_quantity: 20, weight: 0.15, weight_unit: 'lb' },
    ],
  },
  {
    title: '6-0 and Loving It Trucker Hat',
    body_html: '<p>Own your bagels with pride.</p><p>Classic trucker hat with mesh back and "6-0 AND LOVING IT" embroidered on the front. Perfect for those who turn defeats into fashion statements.</p><ul><li>Mesh back ventilation</li><li>Adjustable snapback</li><li>Embroidered front text</li><li>Curved brim</li><li>One size fits most bagels</li></ul><p>Shade the sun. Celebrate the 6-0.</p>',
    vendor: 'Bagel Bros',
    product_type: 'Hat',
    tags: 'drop-001, cheeky, accessories, headwear',
    status: 'active',
    options: [{ name: 'Size' }],
    variants: [
      { option1: 'One Size', price: '35.00', compare_at_price: '50.00', sku: 'BB-LOVING-HAT-OS', inventory_quantity: 60, weight: 0.2, weight_unit: 'lb' },
    ],
  },
  {
    title: 'Court Jester Crew Socks',
    body_html: '<p>Step into defeat with style.</p><p>Athletic crew socks featuring bagel circle icons running up the calf. For those who walk onto the court knowing exactly how it will end.</p><ul><li>Cushioned footbed</li><li>Arch support</li><li>Moisture-wicking</li><li>Bagel circle graphics</li><li>Reinforced heel and toe</li></ul><p>One size fits most defeats.</p>',
    vendor: 'Bagel Bros',
    product_type: 'Socks',
    tags: 'drop-001, cheeky, accessories, socks',
    status: 'active',
    options: [{ name: 'Size' }],
    variants: [
      { option1: 'S/M (6-9)', price: '18.00', compare_at_price: '25.00', sku: 'BB-SOCKS-BLK-SM', inventory_quantity: 50, weight: 0.1, weight_unit: 'lb' },
      { option1: 'L/XL (10-13)', price: '18.00', compare_at_price: '25.00', sku: 'BB-SOCKS-BLK-LX', inventory_quantity: 50, weight: 0.1, weight_unit: 'lb' },
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
      return null;
    }

    if (result.product) {
      console.log(`✅ Created: ${product.title}`);
      return result.product;
    }

    return null;
  } catch (error) {
    console.error(`❌ Error creating "${product.title}":`, error.message);
    return null;
  }
}

async function publishToOnlineStore(productId, publicationId) {
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
    id: `gid://shopify/Product/${productId}`,
    input: [{ publicationId }],
  };

  const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-01/graphql.json`, {
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
  console.log('🥯 Creating Cheeky Bagel Bros Products\n');

  // Online Store publication ID (from earlier)
  const ONLINE_STORE_ID = 'gid://shopify/Publication/307041075273';

  for (const product of products) {
    console.log(`\n📦 Creating: ${product.title}`);
    const created = await createProduct(product);

    if (created) {
      console.log(`   Publishing to Online Store...`);
      await publishToOnlineStore(created.id, ONLINE_STORE_ID);
      console.log(`   ✅ Published!`);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n\n🎉 Cheeky products created!');
  console.log('\n📝 Products added:');
  products.forEach((p, i) => {
    console.log(`${i + 1}. ${p.title} - $${p.variants[0].price}`);
  });

  console.log('\n💡 Next: Check your shop page in ~30 seconds!');
}

main().catch(console.error);
