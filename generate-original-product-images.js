// Generate product images for original 5 products
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

const GEMINI_API_KEY = env.GEMINI_API_KEY;

const products = [
  {
    filename: 'bagel-tee.jpg',
    prompt: "Premium black cotton t-shirt with minimalist white '6-0' tennis score graphic on chest, centered composition on white background, clean product photography, soft studio lighting, folded display, brutalist streetwear aesthetic"
  },
  {
    filename: '6-0-hoodie.jpg',
    prompt: "Black pullover hoodie with bold white 'THE 6-0 HOODIE' text across chest, centered on white background, premium streetwear product photography, soft shadows, modern brutalist aesthetic, clean minimalist composition"
  },
  {
    filename: 'bageled-cap.jpg',
    prompt: "Black baseball cap with embroidered 'BAGELED' text in cream thread on front panel, centered product shot on white background, clean studio lighting, side angle showing curved brim, premium headwear photography"
  },
  {
    filename: 'court-joggers.jpg',
    prompt: "Black athletic joggers with tapered fit, small bagel circle logo on left thigh, centered product photography on white background, soft studio lighting, premium activewear aesthetic, clean minimalist composition"
  },
  {
    filename: 'sticker-pack.jpg',
    prompt: "Set of 5 die-cut vinyl stickers featuring tennis bagel themes, '6-0' scores, bagel circles, arranged in fan layout on white background, high quality product photography, subtle shadows, colorful designs on matte finish stickers"
  }
];

async function generateImage(prompt, filename) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 1,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseMimeType: 'image/jpeg',
        responseModalities: ['image']
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${error}`);
  }

  const data = await response.json();

  if (!data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data) {
    throw new Error('No image data in response');
  }

  const base64Data = data.candidates[0].content.parts[0].inlineData.data;
  const imageBuffer = Buffer.from(base64Data, 'base64');

  const outputPath = path.join(__dirname, 'public', 'images', 'products', filename);
  fs.writeFileSync(outputPath, imageBuffer);

  return outputPath;
}

async function main() {
  console.log('🎨 Generating product images for original products\n');

  for (const product of products) {
    try {
      console.log(`📸 Generating: ${product.filename}`);
      const outputPath = await generateImage(product.prompt, product.filename);
      const stats = fs.statSync(outputPath);
      console.log(`   ✅ Created (${Math.round(stats.size / 1024)}KB)\n`);

      // Rate limit: wait 2 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}\n`);
    }
  }

  console.log('✅ Done generating images!');
}

main().catch(console.error);
