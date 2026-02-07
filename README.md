# Bagel Bros - Drop 001

Premium streetwear for the 6-0 Club. Limited drops, no restocks.

## Tech Stack

- **Next.js 14** - App Router with React Server Components
- **Shopify Storefront API** - Headless e-commerce
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Lightweight state management
- **TypeScript** - Type safety

## Getting Started

### Prerequisites

1. **Shopify Store** - You need a Shopify store with:
   - Products tagged with `drop-001`
   - Storefront API access token
   - Admin API access token (for waitlist)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bagel-bros
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` with your Shopify credentials:
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_token
SHOPIFY_ADMIN_ACCESS_TOKEN=your_admin_token
NEXT_PUBLIC_DROP_MODE=pre-drop
NEXT_PUBLIC_DROP_DATE=2026-03-15T10:00:00Z
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Shopify Setup

### 1. Create Shopify Store
- Sign up at [shopify.com](https://shopify.com)
- Choose the Basic plan ($39/mo)

### 2. Generate API Tokens

**Storefront API Token:**
1. Go to Settings → Apps and sales channels → Develop apps
2. Create a new app
3. Enable Storefront API scopes:
   - `unauthenticated_read_products`
   - `unauthenticated_read_product_listings`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
4. Generate Storefront API access token

**Admin API Token:**
1. In the same app, enable Admin API scopes:
   - `write_customers`
   - `read_customers`
2. Generate Admin API access token

### 3. Add Products
1. Go to Products → Add product
2. Add product details (title, description, price)
3. Add variants for sizes (S, M, L, XL)
4. Upload 3-5 high-quality images
5. **IMPORTANT:** Tag each product with `drop-001`
6. Set inventory quantities
7. Publish to Online Store

### 4. Configure Checkout
1. Settings → Payments → Activate Shopify Payments
2. Settings → Shipping and delivery → Add shipping zones
3. Settings → Checkout → Customize checkout branding

## Drop Modes

The site has three modes controlled by the `NEXT_PUBLIC_DROP_MODE` environment variable:

### Pre-Drop Mode (`pre-drop`)
- Countdown timer to drop date
- Waitlist form active
- Shop disabled
- Use this before launch

### Live Mode (`live`)
- Shop enabled
- Products visible
- Add to cart active
- Use this during the drop

### Sold-Out Mode (`sold-out`)
- Shop disabled
- Sold out messaging
- Drop 002 waitlist active
- Use this after sellout

**To change modes:** Update the environment variable in Vercel dashboard (instant change, no redeploy needed).

## Project Structure

```
bagel-bros/
├── app/                      # Next.js App Router pages
│   ├── about/               # Brand manifesto page
│   ├── api/waitlist/        # Waitlist API endpoint
│   ├── cart/                # Full cart page
│   ├── confirmation/        # Order confirmation
│   ├── privacy/             # Privacy policy
│   ├── shop/                # Product listing & details
│   ├── terms/               # Terms of service
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/
│   ├── cart/                # Cart drawer & items
│   ├── home/                # Waitlist form, countdown
│   ├── layout/              # Header, footer
│   └── shop/                # Product cards, size selector
├── lib/
│   ├── config/              # Drop mode configuration
│   ├── shopify/             # Shopify API client & queries
│   └── store/               # Zustand cart store
├── .env.example             # Environment template
├── next.config.js           # Next.js config
├── tailwind.config.js       # Tailwind config (brand design system)
└── tsconfig.json            # TypeScript config
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables (Production)

Make sure to set all environment variables in Vercel:
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `SHOPIFY_ADMIN_ACCESS_TOKEN`
- `NEXT_PUBLIC_DROP_MODE`
- `NEXT_PUBLIC_DROP_DATE`

### Toggle Drop Mode

To switch between modes without redeploying:
1. Go to Vercel dashboard → Project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_DROP_MODE` to `pre-drop`, `live`, or `sold-out`
3. Changes take effect immediately

## Features

- ✅ Responsive design (mobile-first)
- ✅ Waitlist email capture
- ✅ Countdown timer
- ✅ Product listing with inventory
- ✅ Size selection with touch-optimized UI
- ✅ Shopping cart with live updates
- ✅ Shopify checkout integration
- ✅ Low stock alerts
- ✅ Sold-out states
- ✅ Three drop modes (pre-drop, live, sold-out)

## Development Tips

- Product data is revalidated every 30 seconds
- Cart persists in localStorage
- Images are optimized with Next.js Image component
- Fonts are optimized with Next.js font loading

## Support

For questions or issues:
- Check the [implementation plan](plan.md)
- Review Shopify API documentation
- Check Next.js documentation

## License

All rights reserved - Bagel Bros 2026
