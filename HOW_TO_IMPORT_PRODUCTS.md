# How to Import Products into Shopify

## Option 1: CSV Import (Fastest - 2 Minutes)

### Step 1: Download the CSV
The file `shopify-products-import.csv` is ready in your project folder.

### Step 2: Import to Shopify
1. **Log in to Shopify Admin**
2. **Go to Products** (left sidebar)
3. **Click "Import"** (top right)
4. **Upload the CSV file:** `shopify-products-import.csv`
5. **Click "Upload and continue"**
6. **Review the preview** (should show 5 products, 17 variants total)
7. **Click "Import products"**
8. **Wait ~30 seconds** for import to complete

### Step 3: Verify
- Go to Products → All products
- You should see 5 products:
  - The Bagel Tee (4 variants)
  - The 6-0 Hoodie (4 variants)
  - Bageled Cap (1 variant)
  - Court Joggers (4 variants)
  - 6-0 Sticker Pack (1 variant)
- Each should have the `drop-001` tag

### Step 4: Add Images
For each product:
1. Click on the product
2. Scroll to "Media" section
3. Upload product images (need real photos!)
4. Rearrange so best image is first
5. Click "Save"

---

## Option 2: Manual Entry (Detailed)

If CSV import doesn't work, follow these steps for each product:

### For "The Bagel Tee"

1. **Products → Add product**
2. **Title:** The Bagel Tee
3. **Description:** (copy from PRODUCTS_DROP_001.md)
4. **Price:** $45.00
5. **Compare at price:** $65.00
6. **Cost per item:** $12.00
7. **SKU:** BB-TEE-BLK-S (change per size)
8. **Click "Add variants"**
   - Size: S, M, L, XL
   - For each size, set inventory:
     - S: 20 units
     - M: 30 units
     - L: 30 units
     - XL: 20 units
9. **Tags:** `drop-001, apparel, tee, core`
10. **Product type:** T-Shirt
11. **Vendor:** Bagel Bros
12. **Collections:** (optional) Create "Drop 001" collection
13. **Status:** Active
14. **Save**

Repeat for all 5 products using data from `PRODUCTS_DROP_001.md`.

---

## After Import: Test Your Shop

### 1. Change to Live Mode
In `.env.local`:
```bash
NEXT_PUBLIC_DROP_MODE=live
```

Restart dev server:
```bash
pkill -f "next dev"
npm run dev
```

### 2. Visit Shop Page
Open: http://localhost:3000/shop

You should see:
- All 5 products displayed
- Product images (or placeholders if no images yet)
- Prices showing correctly
- "Add to Cart" buttons

### 3. Test Cart
- Click on a product
- Select a size
- Click "Add to Cart"
- Cart drawer should open
- Product appears in cart
- Update quantity (+ / -)
- Click "Checkout"
- Should redirect to Shopify checkout

### 4. Complete Test Order
- Use Shopify's test credit card:
  - Card: 4242 4242 4242 4242
  - Expiry: Any future date
  - CVC: Any 3 digits
- Complete checkout
- Verify order appears in Shopify Orders

---

## Product Photography Options

### Option A: Hire a Photographer (Recommended)
- Cost: $500-1500 for 5 products
- Turnaround: 1-2 weeks
- Professional quality
- Search for "product photographer near me"

### Option B: AI Product Images (Quick Placeholder)
You already have the image generation setup. Generate placeholders:

```bash
# The Bagel Tee
GEMINI_API_KEY=your-key node "/path/to/cli.js" \
  --prompt "Premium black t-shirt flat lay on cream background, minimalist bagel logo, studio product photography, clean aesthetic" \
  --aspect-ratio 1:1 \
  --output public/images/products/tee-1.jpg

# The 6-0 Hoodie
GEMINI_API_KEY=your-key node "/path/to/cli.js" \
  --prompt "Black heavyweight hoodie on hanger, white background, embroidered logo, luxury streetwear product photography" \
  --aspect-ratio 3:4 \
  --output public/images/products/hoodie-1.jpg

# Bageled Cap
GEMINI_API_KEY=your-key node "/path/to/cli.js" \
  --prompt "Black baseball cap with embroidered logo, clean product photography, white background, front view" \
  --aspect-ratio 1:1 \
  --output public/images/products/cap-1.jpg

# Court Joggers
GEMINI_API_KEY=your-key node "/path/to/cli.js" \
  --prompt "Black athletic joggers flat lay, tapered fit, product photography, minimal aesthetic, white background" \
  --aspect-ratio 3:4 \
  --output public/images/products/joggers-1.jpg

# Sticker Pack
GEMINI_API_KEY=your-key node "/path/to/cli.js" \
  --prompt "Three vinyl stickers with 6-0 scoreboard design, product photography, flat lay on cream surface" \
  --aspect-ratio 1:1 \
  --output public/images/products/stickers-1.jpg
```

Upload these to Shopify as placeholder images until you get real product photos.

### Option C: DIY Product Photos
Equipment needed:
- Smartphone camera (iPhone/Android)
- White poster board or wall
- Natural window light (avoid direct sun)
- Simple hangers/flat surface

Tips:
- Shoot in RAW if possible
- Natural light only
- Clean, minimal backgrounds
- Take 10+ shots per product, pick best 3-5
- Edit for consistency (brightness, contrast, white balance)

---

## Quick Checklist

Before launching:
- [ ] Products imported to Shopify
- [ ] Each product tagged with `drop-001`
- [ ] Product images uploaded (3-5 per product)
- [ ] Prices verified
- [ ] Inventory quantities set
- [ ] Tested in live mode locally
- [ ] Test order completed successfully
- [ ] Products published and active
- [ ] Shipping rates configured in Shopify
- [ ] Payment gateway activated (Shopify Payments/Stripe)

---

## Troubleshooting

**Products don't show on shop page:**
- Check that `drop-001` tag is added to each product
- Verify `NEXT_PUBLIC_DROP_MODE=live` in .env.local
- Restart dev server after env changes

**CSV import fails:**
- Check file encoding (should be UTF-8)
- Try importing 1 product at a time
- Use manual entry as fallback

**Images not uploading:**
- Max file size: 20MB per image
- Supported formats: JPG, PNG, GIF, WebP
- Recommended: 2048x2048px square images

**Inventory not updating:**
- In Shopify: Products → Inventory
- Check "Track quantity" is enabled
- Verify quantities are set for each variant

---

## Need Help?

- **Shopify Support:** help.shopify.com
- **CSV Template Issues:** Use the included `shopify-products-import.csv`
- **Product Data:** Reference `PRODUCTS_DROP_001.md`

Good luck with Drop 001! 🥯
