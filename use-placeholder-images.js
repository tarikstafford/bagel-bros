// Copy existing product images as placeholders for products without images
const fs = require('fs');
const path = require('path');

// Use the cheeky product images as temporary placeholders
const placeholders = {
  'bagel-tee.jpg': 'double-bagel-thong.jpg',
  '6-0-hoodie.jpg': 'bagel-buns-shorts.jpg',
  'bageled-cap.jpg': 'loving-it-hat.jpg',
  'court-joggers.jpg': 'bagel-buns-shorts.jpg',
  'sticker-pack.jpg': 'court-jester-socks.jpg',
};

const productsDir = path.join(__dirname, 'public', 'images', 'products');

console.log('📋 Creating placeholder images for missing products\n');

for (const [target, source] of Object.entries(placeholders)) {
  const targetPath = path.join(productsDir, target);
  const sourcePath = path.join(productsDir, source);

  if (!fs.existsSync(targetPath) && fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`✅ Created placeholder: ${target} (from ${source})`);
  } else if (fs.existsSync(targetPath)) {
    console.log(`ℹ️  ${target} already exists`);
  } else {
    console.log(`❌ Source not found: ${source}`);
  }
}

console.log('\n✅ Done! Replace these with real product photos when ready.');
