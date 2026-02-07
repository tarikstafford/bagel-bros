// Generate missing product images using Gemini API
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
    prompt: "Product photography of premium black cotton t-shirt with minimalist white '6-0' tennis score graphic centered on chest, laid flat on white background, clean studio lighting, soft shadows, brutalist streetwear aesthetic, high-end minimalist composition"
  },
  {
    filename: '6-0-hoodie.jpg',
    prompt: "Product photography of black pullover hoodie with bold white 'THE 6-0 HOODIE' text across chest, laid flat on white background, premium streetwear aesthetic, clean studio lighting, soft shadows, brutalist minimalist design"
  },
  {
    filename: 'bageled-cap.jpg',
    prompt: "Product photography of black baseball cap with embroidered 'BAGELED' text in cream thread on front panel, centered on white background, three-quarter angle view showing curved brim, clean studio lighting, premium headwear photography"
  },
  {
    filename: 'court-joggers.jpg',
    prompt: "Product photography of black athletic joggers with tapered fit and small bagel circle logo on left thigh, laid flat on white background, clean studio lighting, soft shadows, premium activewear aesthetic, minimalist composition"
  },
  {
    filename: 'sticker-pack.jpg',
    prompt: "Product photography of 5 die-cut vinyl stickers featuring tennis bagel themes and '6-0' scores, arranged in overlapping fan layout on white background, high quality studio lighting, subtle shadows, colorful graphic designs on matte finish stickers"
  }
];

async function generateImage(prompt, filename) {
  console.log(`\n🎨 Generating: ${filename}`);
  console.log(`Prompt: ${prompt.substring(0, 80)}...`);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${GEMINI_API_KEY}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{
          prompt: prompt
        }],
        parameters: {
          sampleCount: 1,
          aspectRatio: "1:1",
          safetyFilterLevel: "block_some",
          personGeneration: "allow_adult"
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    if (!data.predictions?.[0]?.bytesBase64Encoded) {
      throw new Error('No image data in response: ' + JSON.stringify(data));
    }

    const base64Data = data.predictions[0].bytesBase64Encoded;
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const outputPath = path.join(__dirname, 'public', 'images', 'products', filename);
    fs.writeFileSync(outputPath, imageBuffer);

    const stats = fs.statSync(outputPath);
    console.log(`✅ Created ${filename} (${Math.round(stats.size / 1024)}KB)`);

    return outputPath;
  } catch (error) {
    console.error(`❌ Failed to generate ${filename}: ${error.message}`);
    throw error;
  }
}

async function main() {
  console.log('📸 Generating missing product images\n');
  console.log('This will take about 10-15 seconds...\n');

  for (const product of products) {
    try {
      await generateImage(product.prompt, product.filename);
      // Rate limit: wait 2 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`\nSkipping ${product.filename} due to error\n`);
    }
  }

  console.log('\n✅ Done generating images!');
}

main().catch(console.error);
