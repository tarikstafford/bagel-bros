# AI Content Guide for Bagel Bros

This guide explains how to generate and add AI images/videos to replace the current Unsplash placeholders.

---

## 🎨 Current Image Setup

The site now uses **real placeholder images** from Unsplash that match the aesthetic. These can be easily replaced with AI-generated content.

### Where Images Are Used

1. **Homepage** (`app/page.tsx`)
   - Hero background (full viewport)
   - Lifestyle video section
   - Brand story image (4:5 ratio)
   - Product preview grid (4 images)
   - Community Instagram grid (6 images)

2. **About Page** (`app/about/page.tsx`)
   - Hero background
   - Scoreboard image
   - Gallery images (2x)
   - Large lifestyle image (4:5)
   - Team gallery (4 images)

3. **Product Pages**
   - Product images from Shopify
   - These should be real product photography

---

## 🤖 AI Image Generation Options

### Recommended AI Tools

#### 1. **Midjourney** (Best Quality)
```
Subscription: $10-60/month
Best for: High-quality lifestyle shots, product mockups
URL: midjourney.com
```

**Example Prompts for Bagel Bros:**

```
Hero Background:
"Wide shot of 4 friends playing padel on outdoor court, golden hour lighting,
sporty streetwear clothing, candid action, cinematic photography, high energy,
Fujifilm XT4 aesthetic --ar 16:9 --style raw"

Lifestyle Shots:
"Young athletic people wearing casual streetwear, post-padel match,
laughing together courtside, natural lighting, editorial photography,
authentic documentary style --ar 4:5"

Product Mockup:
"Premium black t-shirt with minimalist bagel logo, flat lay on cream
background, brutalist aesthetic, clean product photography, studio lighting
--ar 3:4"

Community Shots:
"Padel players celebrating despite losing, scoreboard showing 6-0,
candid moment, sports photography, authentic vibes --ar 1:1"
```

#### 2. **DALL-E 3** (Good Quality, Easy Access)
```
Access: ChatGPT Plus ($20/month) or API
Best for: Quick iterations, concept art
URL: openai.com
```

**Example Prompts:**

```
"High-quality photograph of padel players on court wearing modern
streetwear, dramatic sunset lighting, shot with professional camera,
photorealistic, 8K quality"

"Flat lay product photography of premium t-shirt with minimalist
logo, clean white background, professional ecommerce photography"
```

#### 3. **Stable Diffusion** (Free, Advanced)
```
Cost: Free (self-hosted) or $10-30/month (services)
Best for: Custom control, batch generation
URL: stability.ai or civitai.com
```

**Recommended Models:**
- Realistic Vision
- DreamShaper
- Epic Realism

#### 4. **Leonardo.ai** (Balanced Option)
```
Free tier: 150 images/day
Paid: $10-30/month
Best for: Quick generation, good quality
URL: leonardo.ai
```

---

## 🎬 AI Video Generation

### Recommended Tools

#### 1. **Runway Gen-2** (Best Quality)
```
Cost: $15-35/month
Length: Up to 16 seconds
URL: runwayml.com
Best for: Hero videos, lifestyle clips
```

**Example Prompts:**

```
"Slow motion shot of padel players serving on outdoor court,
golden hour lighting, cinematic camera movement, 4K quality"

"Close-up of premium t-shirt fabric texture, smooth camera pan,
studio lighting, product video aesthetic"
```

#### 2. **Pika Labs** (Good Alternative)
```
Cost: Free beta or $10-35/month
Length: Up to 3 seconds
URL: pika.art
```

#### 3. **Synthesia** (For Talking Heads)
```
Cost: $30-90/month
Best for: Brand story videos, testimonials
URL: synthesia.io
```

---

## 📸 Specific Image Requirements by Section

### Homepage Hero Background
- **Size:** 2940x1960px (16:9)
- **Style:** Outdoor padel court, players in action, golden hour
- **Mood:** Energetic, candid, lifestyle
- **Current:** `https://images.unsplash.com/photo-1554068865-24cecd4e34b8`

**AI Prompt:**
```
"Wide cinematic shot of padel court with 4 players mid-game,
outdoor setting, golden hour lighting, athletic casualwear,
dramatic sports photography, shot on RED camera --ar 16:9 --v 6"
```

### Lifestyle Section
- **Size:** 2939x2205px (4:3)
- **Style:** Players lifestyle, candid moments
- **Mood:** Authentic, fun, post-game vibes
- **Current:** `https://images.unsplash.com/photo-1622279457486-62dcc4a431d6`

**AI Prompt:**
```
"Group of friends in sporty streetwear sitting courtside, laughing,
post-padel match, natural candid photography, documentary style,
warm afternoon light --ar 4:3"
```

### Product Hero (Homepage)
- **Size:** 2940x3675px (4:5)
- **Style:** Single player in branded gear, action shot
- **Mood:** Dynamic, premium, focused
- **Current:** `https://images.unsplash.com/photo-1626224583764-f87db24ac4ea`

**AI Prompt:**
```
"Athletic person wearing minimal black t-shirt, serving on padel court,
mid-action, professional sports photography, clean composition,
editorial quality --ar 4:5"
```

### Product Grid (4 images)
- **Size:** 2960x2960px (1:1)
- **Style:** Product-focused, lifestyle context
- **Mood:** Premium streetwear aesthetic

**AI Prompts:**
```
1. "Premium black t-shirt flat lay, minimalist design, studio lighting"
2. "White hoodie on hanger, clean background, product photography"
3. "Black cap with logo, styled shot, ecommerce photography"
4. "Athletic joggers flat lay, minimal aesthetic, studio setup"
```

### Community Grid (6 images)
- **Size:** Various (Instagram-style)
- **Style:** User-generated content look
- **Mood:** Authentic, community-driven

---

## 🔄 How to Replace Images

### Step 1: Generate AI Images

Use one of the tools above with the prompts provided. For consistency:

1. **Choose one AI tool** for all images (consistent style)
2. **Use similar prompts** (same camera, lighting descriptions)
3. **Generate extras** (you'll want options)
4. **Edit if needed** (Photoshop, Figma for minor adjustments)

### Step 2: Optimize Images

Before uploading:

1. **Resize** to optimal dimensions
   ```bash
   # Using ImageMagick
   convert input.jpg -resize 2940x1960^ -gravity center -extent 2940x1960 output.jpg
   ```

2. **Compress** for web
   ```bash
   # Using ImageMagick
   convert input.jpg -quality 85 output.jpg
   ```

3. **Convert to WebP** (optional, Next.js does this automatically)
   ```bash
   cwebp -q 85 input.jpg -o output.webp
   ```

### Step 3: Add to Project

#### Option A: Replace Unsplash URLs

Simply replace the Unsplash URLs in the code with your own hosted images:

```tsx
// Before
src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8"

// After (using your CDN/hosting)
src="https://yourdomain.com/images/hero-background.jpg"
```

#### Option B: Add to Public Folder

1. Create `/public/images/` directory
2. Add your images
3. Update image sources:

```tsx
src="/images/hero-background.jpg"
```

#### Option C: Use Vercel Blob Storage

```bash
# Install Vercel CLI
npm i -g vercel

# Upload images
vercel blob put hero-background.jpg --token=your_token
```

Then update URLs to Vercel blob URLs.

---

## 🎥 Adding Videos

### Video Sections Ready for Content

1. **Homepage Lifestyle Section**
   - Location: `app/page.tsx` around line 120
   - Currently: Static image with play button overlay
   - Recommended: 10-15 second lifestyle clip

2. **About Page Header**
   - Could add background video instead of image
   - Looping, no audio needed

### Implementation

#### Step 1: Generate Video

Use Runway or Pika with prompts like:
```
"Slow motion padel serve, outdoor court, golden hour,
cinematic camera movement, 4K"
```

#### Step 2: Optimize Video

```bash
# Using FFmpeg
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k output.mp4
```

#### Step 3: Add to Site

Replace the image with video:

```tsx
// Before
<Image src="..." alt="..." fill />

// After
<video
  autoPlay
  loop
  muted
  playsInline
  className="object-cover"
>
  <source src="/videos/lifestyle.mp4" type="video/mp4" />
</video>
```

---

## 📋 Complete Image Checklist

### Homepage (11 images)
- [ ] Hero background (16:9)
- [ ] Lifestyle section (4:3)
- [ ] Brand story image (4:5)
- [ ] Product grid (4x 1:1)
- [ ] Community grid (6x varying)

### About Page (11+ images)
- [ ] Hero background (16:9)
- [ ] Scoreboard image (16:9)
- [ ] Story gallery (2x 1:1)
- [ ] Large lifestyle (4:5)
- [ ] Team gallery (4x 3:4)

### Total: ~22 unique images needed

---

## 🎨 Style Consistency Tips

To maintain visual cohesion across all AI-generated content:

1. **Use the same AI tool** for all images
2. **Keep lighting consistent** (golden hour, natural light)
3. **Match color grading** (warm tones, slightly desaturated)
4. **Consistent models/people** (similar ages, styles)
5. **Same photography style** (documentary/editorial)

### Recommended Style Keywords

Include these in most prompts:
- "cinematic photography"
- "shot on Fujifilm XT4" (warm, authentic look)
- "natural lighting"
- "editorial quality"
- "authentic candid moment"
- "documentary style"
- "--style raw" (Midjourney)

---

## 💰 Budget Recommendations

### Minimal Budget ($10-30/month)
- **Leonardo.ai** for images (150 free/day)
- **Pika** for short videos (free beta)
- Total: ~$10-20/month

### Recommended Budget ($40-70/month)
- **Midjourney** Standard ($30/month)
- **Runway** Standard ($15/month)
- **Buffer** for extras
- Total: ~$45-60/month

### Professional Budget ($100+/month)
- **Midjourney** Pro ($60/month)
- **Runway** Pro ($35/month)
- **Synthesia** for testimonials ($30/month)
- Total: ~$125/month

---

## 🚀 Quick Start Workflow

1. **Sign up for Midjourney** ($10 for starter)
2. **Generate 25 images** using prompts above
3. **Download best 22 images**
4. **Optimize** with ImageMagick or TinyPNG
5. **Upload to Vercel** or use `/public/images/`
6. **Replace URLs** in code
7. **Test locally** with `npm run dev`
8. **Deploy** when satisfied

---

## 📝 Image Naming Convention

Use descriptive names for organization:

```
hero-background-padel-court.jpg
lifestyle-friends-courtside.jpg
product-black-tee-lifestyle.jpg
community-user-1-square.jpg
about-hero-scoreboard.jpg
team-member-1-portrait.jpg
```

---

## ⚠️ Legal Considerations

### AI-Generated Content Rights

- **Midjourney:** You own rights if subscribed
- **DALL-E:** Commercial use allowed
- **Stable Diffusion:** Depends on model license
- **Check terms** for each tool before commercial use

### Model Releases

Since images are AI-generated, no model releases needed (no real people). But:
- Don't claim they're real photographs
- Be transparent if asked
- Follow platform TOS

---

## 🎯 Priority Order

If doing this in phases:

**Phase 1 (High Impact):**
1. Homepage hero background
2. Homepage lifestyle section
3. About page hero
4. Product grid (4 images)

**Phase 2 (Polish):**
5. Community grid
6. About page gallery images
7. Team photos

**Phase 3 (Enhancement):**
8. Videos for homepage
9. About page video
10. Additional lifestyle shots

---

## 🔗 Resources

- **Midjourney Discord:** discord.gg/midjourney
- **Prompt Database:** prompthero.com
- **Image Optimization:** tinypng.com
- **Video Compression:** handbrake.fr
- **Stock Reference:** unsplash.com (for style inspiration)

---

## 💡 Pro Tips

1. **Generate in batches** - Create 10-20 variations, pick best
2. **Save prompt formulas** - Reuse successful prompts
3. **Use consistent seeds** - Midjourney can maintain style
4. **Upscale important images** - Use AI upscalers for key visuals
5. **Test on mobile** - Verify images look good at small sizes
6. **Monitor performance** - Use Next.js Image for optimization
7. **Keep originals** - Save uncompressed versions

---

Ready to upgrade your visuals? Start with Midjourney or Leonardo.ai and use the prompts above! 🎨

The site is already structured to handle the images - just swap the URLs and you're done.
