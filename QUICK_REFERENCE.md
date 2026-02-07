# Quick Reference Card

Essential commands and configurations for Bagel Bros.

## 🚀 Commands

```bash
# Development
npm run dev          # Start dev server (localhost:3000)
npm run build        # Test production build
npm run start        # Run production build locally
npm run lint         # Run ESLint

# Git
git add .
git commit -m "message"
git push

# Shopify
# All Shopify operations done via Admin UI
```

## 🔧 Environment Variables

```env
# Required
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxxxx
SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxxxx
NEXT_PUBLIC_DROP_MODE=pre-drop|live|sold-out
NEXT_PUBLIC_DROP_DATE=2026-03-15T10:00:00Z
```

## 📂 Key Files

```
app/page.tsx                    # Homepage
app/shop/page.tsx              # Product listing
app/shop/[handle]/page.tsx     # Product details
app/api/waitlist/route.ts      # Waitlist API
lib/config/drop-config.ts      # Drop mode logic
lib/shopify/client.ts          # Shopify API
lib/store/cart-store.ts        # Cart state
tailwind.config.js             # Brand colors
```

## 🎨 Brand Colors

```javascript
'bagel-tan': '#D4A574'
'bagel-green': '#4A7C59'
'cream': '#F5F1E8'
'true-black': '#0A0A0A'
'true-white': '#FEFEFE'
```

## 🔄 Drop Mode States

| Mode | Shop | Waitlist | Countdown |
|------|------|----------|-----------|
| `pre-drop` | ❌ | ✅ Drop 001 | ✅ |
| `live` | ✅ | ❌ | ❌ |
| `sold-out` | ❌ | ✅ Drop 002 | ❌ |

## 📍 Routes

```
/                  # Homepage (dynamic per mode)
/shop              # Product listing
/shop/[handle]     # Product details
/cart              # Full cart page
/about             # Brand manifesto
/confirmation      # Order confirmation
/terms             # Terms of service
/privacy           # Privacy policy
/api/waitlist      # Waitlist endpoint (POST)
```

## 🛒 Cart Flow

```
1. Select size → Enable "Add to Cart"
2. Click "Add to Cart" → Opens cart drawer
3. Update quantities → Auto-saves to localStorage
4. Click "Checkout" → Redirect to Shopify
5. Complete order → Shopify handles payment
```

## 📦 Shopify Tags

```
drop-001           # Tag for Drop 001 products (REQUIRED)
waitlist-drop-001  # Customer tag for waitlist
6-0-club           # Customer tag for all customers
```

## 🔑 API Scopes

**Storefront API:**
- `unauthenticated_read_product_listings`
- `unauthenticated_read_products`
- `unauthenticated_write_checkouts`
- `unauthenticated_read_checkouts`

**Admin API:**
- `write_customers`
- `read_customers`

## ⚡ Performance

```
ISR Revalidation:    30 seconds
Image Optimization:  Automatic (Next.js)
Font Loading:        Preload (Next.js)
Cart Persistence:    localStorage
Target LCP:          <2.5s
Target Lighthouse:   >90
```

## 🐛 Common Issues

**Products not showing?**
- Check `drop-001` tag in Shopify
- Verify `NEXT_PUBLIC_DROP_MODE=live`

**Waitlist not saving?**
- Check Admin API token
- Verify `write_customers` scope

**Build fails?**
- Run `npm install` again
- Check environment variables

**Cart not persisting?**
- Clear browser localStorage
- Check browser console for errors

## 📱 Testing Checklist

- [ ] Countdown timer works
- [ ] Waitlist saves to Shopify
- [ ] Products load in live mode
- [ ] Add to cart works
- [ ] Checkout redirects
- [ ] Mobile responsive
- [ ] Images optimized

## 🚢 Deploy to Vercel

```bash
1. Push to GitHub
2. Import to Vercel
3. Add env variables
4. Deploy
5. Update drop mode as needed (instant, no redeploy)
```

## 📊 Monitoring

**Vercel:**
- Project → Deployments → Logs
- Project → Analytics → Performance

**Shopify:**
- Orders → View orders
- Customers → Check waitlist tags
- Analytics → Reports

## 🆘 Emergency Actions

**Pause Drop:**
```
NEXT_PUBLIC_DROP_MODE=pre-drop
```

**Enable Shop:**
```
NEXT_PUBLIC_DROP_MODE=live
```

**Mark Sold Out:**
```
NEXT_PUBLIC_DROP_MODE=sold-out
```

Changes in Vercel env vars take effect immediately!

## 📞 Documentation

- `README.md` - Overview
- `SETUP.md` - Shopify setup
- `DEPLOYMENT.md` - Deploy guide
- `TESTING.md` - Test checklist
- `PROJECT_SUMMARY.md` - Implementation details

## 💡 Tips

- Test in `pre-drop` mode first
- Add 3-5 products minimum
- Use high-quality images (<500KB)
- Tag ALL products with `drop-001`
- Test checkout end-to-end
- Monitor inventory during drop
- Have fun! 🥯

---

**Keep this file handy during development and launch!**
