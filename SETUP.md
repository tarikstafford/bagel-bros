# Bagel Bros - Setup Guide

This guide will walk you through setting up your Bagel Bros store from scratch.

## Step 1: Shopify Store Setup

### Create Your Shopify Store

1. Go to [shopify.com](https://shopify.com) and sign up
2. Choose the **Basic Plan** ($39/month)
3. Complete store setup with your business information

### Generate API Credentials

1. **Navigate to Apps:**
   - Settings → Apps and sales channels → Develop apps
   - Click "Create an app"
   - Name it "Bagel Bros Headless"

2. **Configure Storefront API:**
   - Click "Configure Storefront API scopes"
   - Enable these scopes:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_products`
     - `unauthenticated_write_checkouts`
     - `unauthenticated_read_checkouts`
   - Click "Save"
   - Go to "API credentials" tab
   - Click "Install app"
   - Copy the **Storefront API access token**

3. **Configure Admin API:**
   - Click "Configure Admin API scopes"
   - Enable these scopes:
     - `write_customers`
     - `read_customers`
   - Click "Save"
   - Go to "API credentials" tab
   - Copy the **Admin API access token**

4. **Save Your Credentials:**
   - Storefront API token → Use in `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
   - Admin API token → Use in `SHOPIFY_ADMIN_ACCESS_TOKEN`
   - Store domain → e.g., `your-store.myshopify.com`

## Step 2: Add Products

### Create Your First Product

1. **Go to Products → Add product**

2. **Product Information:**
   - Title: e.g., "6-0 Club Premium Tee"
   - Description: Write a compelling description (3-5 sentences)
   - Price: Set your price (e.g., $45.00)

3. **Media:**
   - Upload 3-5 high-quality product images
   - First image becomes the featured image

4. **Variants (IMPORTANT):**
   - Click "Add variant"
   - Option name: "Size"
   - Values: S, M, L, XL
   - Set price for each variant
   - Set inventory quantity for each size

5. **Organization:**
   - **CRITICAL:** Add tag `drop-001` (this filters products on the site)
   - Set product type (e.g., "Apparel")
   - Set vendor (e.g., "Bagel Bros")

6. **Availability:**
   - Sales channels: Enable "Online Store"

7. **Save product**

### Repeat for All Products

Create 3-5 products following the same process. Make sure ALL products have the `drop-001` tag.

## Step 3: Configure Checkout

### Set Up Payments

1. **Go to Settings → Payments**
2. **Activate Shopify Payments** (or connect Stripe/PayPal)
3. Complete verification steps
4. Test checkout in test mode first

### Configure Shipping

1. **Go to Settings → Shipping and delivery**
2. **Add shipping zones:**
   - Domestic (your country)
   - International (optional)
3. **Set shipping rates:**
   - Example: "Standard Shipping - $5.00"
   - Example: "Free Shipping - Orders over $75"

### Customize Checkout

1. **Go to Settings → Checkout**
2. **Branding:**
   - Upload logo
   - Set brand colors (match your site)
3. **Customer contact:**
   - Require email or phone
4. **Marketing:**
   - Enable "Pre-select option to receive marketing emails"

## Step 4: Local Development Setup

### Clone and Install

```bash
# Navigate to project directory
cd bagel-bros

# Install dependencies
npm install
```

### Configure Environment Variables

1. **Copy the example file:**
```bash
cp .env.local.example .env.local
```

2. **Edit `.env.local` with your credentials:**
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-actual-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_actual_storefront_token
SHOPIFY_ADMIN_ACCESS_TOKEN=your_actual_admin_token
NEXT_PUBLIC_DROP_MODE=pre-drop
NEXT_PUBLIC_DROP_DATE=2026-03-15T10:00:00Z
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Step 5: Test the Site

### Pre-Drop Mode Testing

1. **Homepage should show:**
   - Countdown timer
   - Waitlist form
   - "Shop" link disabled in header

2. **Test waitlist:**
   - Enter an email
   - Submit form
   - Check Shopify Customers for new entry with tags

### Switch to Live Mode

Update `.env.local`:
```env
NEXT_PUBLIC_DROP_MODE=live
```

Restart dev server:
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Live Mode Testing

1. **Shop page:**
   - Should show all products tagged `drop-001`
   - Click a product to view details

2. **Product page:**
   - Select a size
   - Click "Add to Cart"
   - Cart drawer should open

3. **Cart:**
   - Update quantities
   - Remove items
   - Click "Checkout"
   - Should redirect to Shopify checkout

4. **Complete test order:**
   - Use Shopify test credit card: `1` (Bogus Gateway)
   - Or use real card in test mode
   - Verify order appears in Shopify Orders

## Step 6: Deploy to Production

### Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Bagel Bros MVP"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Import your GitHub repository**
3. **Add environment variables:**
   - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
   - `SHOPIFY_ADMIN_ACCESS_TOKEN`
   - `NEXT_PUBLIC_DROP_MODE` → `pre-drop`
   - `NEXT_PUBLIC_DROP_DATE` → Your drop date
4. **Deploy**

### Configure Custom Domain (Optional)

1. **In Vercel:** Settings → Domains
2. **Add your domain:** e.g., `bagelbros.com`
3. **Update DNS records** as instructed
4. **Wait for SSL certificate** (automatic)

## Step 7: Pre-Launch Checklist

- [ ] All products added with `drop-001` tag
- [ ] Product images are high quality and fast loading
- [ ] Inventory quantities are set correctly
- [ ] Shipping rates configured
- [ ] Payment gateway activated
- [ ] Test order completed successfully
- [ ] Waitlist form tested and working
- [ ] Drop mode set to `pre-drop`
- [ ] Drop date/time set correctly
- [ ] Site tested on mobile device
- [ ] Social media links updated in Footer
- [ ] About page reviewed for tone/accuracy

## Step 8: Launch Day

### 30 Minutes Before Drop

1. **Update drop mode to `live`:**
   - Vercel → Environment Variables
   - Change `NEXT_PUBLIC_DROP_MODE` to `live`
   - Save (takes effect immediately)

2. **Verify shop is live:**
   - Visit site
   - Confirm products are visible
   - Test add to cart

### During Drop

- Monitor Shopify Orders dashboard
- Watch inventory levels
- Respond to customer messages/emails

### After Sellout

1. **Update drop mode to `sold-out`:**
   - Change `NEXT_PUBLIC_DROP_MODE` to `sold-out`
   - This shows sold out messaging
   - Enables Drop 002 waitlist

## Troubleshooting

### Products not showing up
- Verify products have `drop-001` tag
- Check Shopify API credentials are correct
- Ensure products are published to Online Store

### Waitlist not working
- Check Admin API token has `write_customers` scope
- Verify email format is valid
- Check Shopify Customers → verify entry with tags

### Cart not working
- Check Storefront API token has checkout scopes
- Clear browser localStorage
- Try in incognito/private window

### Build errors
- Run `npm run build` locally to test
- Check all environment variables are set
- Verify no TypeScript errors

## Support Resources

- [Shopify Storefront API Docs](https://shopify.dev/api/storefront)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)

## Next Steps (Post-Launch)

1. **Analytics:** Set up Vercel Analytics for performance monitoring
2. **Email Marketing:** Integrate Klaviyo or Mailchimp for automated drops
3. **Customer Reviews:** Add product review system
4. **Drop 002:** Plan next collection based on Drop 001 learnings

---

**Questions?** Review the README.md or reach out to your development team.
