# Launch Checklist for Bagel Bros Drop 001

Use this checklist to ensure everything is ready for launch.

---

## ☑️ Phase 1: Shopify Setup (Complete Before Coding)

### Shopify Store
- [ ] Shopify store created (Basic plan, $39/mo)
- [ ] Store name and business info configured
- [ ] Custom domain added (optional)

### API Credentials
- [ ] Storefront API app created
- [ ] Storefront API scopes enabled:
  - [ ] `unauthenticated_read_product_listings`
  - [ ] `unauthenticated_read_products`
  - [ ] `unauthenticated_write_checkouts`
  - [ ] `unauthenticated_read_checkouts`
- [ ] Storefront API token copied
- [ ] Admin API scopes enabled:
  - [ ] `write_customers`
  - [ ] `read_customers`
- [ ] Admin API token copied

### Products
- [ ] 3-5 products created
- [ ] Each product has:
  - [ ] Compelling title
  - [ ] Description (3-5 sentences)
  - [ ] 3-5 high-quality images
  - [ ] Variants for sizes (S, M, L, XL)
  - [ ] Price set for each variant
  - [ ] Inventory quantities set
  - [ ] **`drop-001` tag added** ⚠️ CRITICAL
  - [ ] Published to Online Store

### Checkout Configuration
- [ ] Shopify Payments activated (or Stripe/PayPal)
- [ ] Test payment method configured
- [ ] Shipping zones added
- [ ] Shipping rates configured
- [ ] Checkout branding customized
- [ ] Customer contact method set

### Test Order
- [ ] Test order completed successfully
- [ ] Email confirmation received
- [ ] Order appears in Shopify Orders

---

## ☑️ Phase 2: Local Development Setup

### Environment
- [ ] Code downloaded/cloned
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created from example
- [ ] Environment variables configured:
  - [ ] `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
  - [ ] `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
  - [ ] `SHOPIFY_ADMIN_ACCESS_TOKEN`
  - [ ] `NEXT_PUBLIC_DROP_MODE=pre-drop`
  - [ ] `NEXT_PUBLIC_DROP_DATE` (your launch date)

### Development Server
- [ ] Dev server starts (`npm run dev`)
- [ ] No console errors
- [ ] Homepage loads at localhost:3000

### Build Test
- [ ] Production build succeeds (`npm run build`)
- [ ] No TypeScript errors
- [ ] No build warnings

---

## ☑️ Phase 3: Feature Testing (Pre-Drop Mode)

### Homepage
- [ ] Countdown timer displays
- [ ] Timer counts down correctly
- [ ] Waitlist form visible
- [ ] Brand messaging loads
- [ ] Mobile responsive

### Waitlist Form
- [ ] Email validation works
- [ ] Form submits successfully
- [ ] Success message shows
- [ ] Email appears in Shopify Customers
- [ ] Customer has tags: `waitlist-drop-001`, `6-0-club`

### Navigation
- [ ] Header logo links to home
- [ ] About page loads
- [ ] Footer links work
- [ ] Shop link is NOT visible (pre-drop mode)

---

## ☑️ Phase 4: Feature Testing (Live Mode)

### Setup
- [ ] `NEXT_PUBLIC_DROP_MODE` changed to `live`
- [ ] Dev server restarted

### Shop Page
- [ ] Products tagged `drop-001` appear
- [ ] Product images load fast
- [ ] Prices display correctly
- [ ] Low stock badges show (if inventory < 5)
- [ ] Grid layout responsive on mobile

### Product Detail Page
- [ ] All images display
- [ ] Product info correct
- [ ] Size selector shows all variants
- [ ] Out of stock sizes grayed out
- [ ] Low stock messages show
- [ ] "Add to Cart" disabled until size selected

### Add to Cart
- [ ] Select size → button enables
- [ ] Click "Add to Cart" → success toast
- [ ] Cart drawer opens
- [ ] Product appears in cart
- [ ] Cart badge shows count

### Cart Management
- [ ] Update quantity (+ / -)
- [ ] Remove items
- [ ] Subtotal calculates correctly
- [ ] Cart persists on page refresh
- [ ] "Checkout" button visible

### Checkout Flow
- [ ] Click "Checkout" → redirects to Shopify
- [ ] Products match cart
- [ ] Complete test order
- [ ] Order confirmation received
- [ ] Order appears in Shopify dashboard

---

## ☑️ Phase 5: Mobile Testing

### Devices to Test
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad (Safari)

### Mobile Features
- [ ] Homepage readable (no horizontal scroll)
- [ ] Countdown timer fits screen
- [ ] Waitlist form easy to use
- [ ] Touch targets are large (44px+)
- [ ] Product cards stack properly
- [ ] Size selector chips tappable
- [ ] Cart drawer full-screen
- [ ] Checkout button accessible
- [ ] Images load quickly

---

## ☑️ Phase 6: Performance Testing

### Lighthouse Audit
- [ ] Run Lighthouse in Chrome DevTools
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90

### Load Times
- [ ] Homepage LCP < 2.5s
- [ ] Shop page LCP < 2.5s
- [ ] Product page LCP < 2.5s
- [ ] No layout shift (CLS < 0.1)

### Network
- [ ] Images are optimized
- [ ] Fonts preloaded
- [ ] No 404 errors
- [ ] API calls return 200

---

## ☑️ Phase 7: Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome

**Check:**
- [ ] Fonts load correctly
- [ ] Colors match brand
- [ ] Cart drawer works
- [ ] Checkout redirects

---

## ☑️ Phase 8: Production Deployment

### GitHub
- [ ] Repository created
- [ ] Code pushed to main branch
- [ ] `.env.local` NOT committed (in .gitignore)

### Vercel
- [ ] Project imported from GitHub
- [ ] Environment variables added
- [ ] Initial deployment successful
- [ ] Production URL works

### Custom Domain (Optional)
- [ ] Domain added in Vercel
- [ ] DNS records configured
- [ ] SSL certificate active

---

## ☑️ Phase 9: Pre-Launch (2-4 Weeks Before)

### Drop Mode
- [ ] `NEXT_PUBLIC_DROP_MODE=pre-drop` in Vercel
- [ ] `NEXT_PUBLIC_DROP_DATE` set correctly
- [ ] Countdown shows correct date/time

### Marketing
- [ ] Social media accounts created
- [ ] Instagram posts scheduled
- [ ] Twitter/X posts scheduled
- [ ] Email to existing customers (if any)

### Monitoring
- [ ] Vercel Analytics enabled
- [ ] Uptime monitor set up (optional)
- [ ] Email alerts configured

### Final Checks
- [ ] Homepage looks professional
- [ ] Waitlist form tested in production
- [ ] About page reviewed for typos
- [ ] Footer social links updated
- [ ] Mobile tested on production URL

---

## ☑️ Phase 10: Launch Day (Drop Goes Live)

### 30 Minutes Before
- [ ] Update `NEXT_PUBLIC_DROP_MODE=live` in Vercel
- [ ] Verify change takes effect
- [ ] Test shop page loads
- [ ] Test add to cart
- [ ] Announce on social media

### During Drop
- [ ] Monitor Shopify Orders dashboard
- [ ] Watch inventory levels
- [ ] Respond to customer messages
- [ ] Check Vercel function logs
- [ ] Post updates on social media

### If Issues Arise
- [ ] Check Vercel deployment logs
- [ ] Rollback to previous deployment if needed
- [ ] Pause drop (set mode to `pre-drop`)
- [ ] Fix issue and redeploy

---

## ☑️ Phase 11: Post-Drop (After Sellout)

### Update Site
- [ ] Change `NEXT_PUBLIC_DROP_MODE=sold-out`
- [ ] Verify sold-out message shows
- [ ] Test Drop 002 waitlist form

### Customer Service
- [ ] Respond to all customer emails
- [ ] Process any returns/exchanges
- [ ] Thank customers on social media

### Analytics Review
- [ ] Check Vercel Analytics
  - [ ] Traffic stats
  - [ ] Performance metrics
  - [ ] Page views
- [ ] Check Shopify Reports
  - [ ] Total revenue
  - [ ] Average order value
  - [ ] Top-selling products
  - [ ] Time to sellout

### Lessons Learned
- [ ] What worked well?
- [ ] What could improve?
- [ ] Customer feedback themes?
- [ ] Performance issues?

### Plan Drop 002
- [ ] Review Drop 001 sales data
- [ ] Plan new products
- [ ] Set Drop 002 date
- [ ] Update waitlist messaging

---

## 🚨 Emergency Contacts

**Shopify Support:** Shopify Help Center  
**Vercel Support:** vercel.com/support  
**Payment Issues:** Shopify Payments support

---

## ✅ Final Pre-Launch Checklist

**24 Hours Before Launch:**

- [ ] All tests passing
- [ ] Mobile tested on real devices
- [ ] Drop mode set to `pre-drop`
- [ ] Drop date/time correct
- [ ] Social media posts scheduled
- [ ] Customer support ready
- [ ] Shopify inventory correct
- [ ] Shipping settings verified
- [ ] Payment gateway tested
- [ ] Team briefed on launch plan

**1 Hour Before Launch:**

- [ ] All systems operational
- [ ] Last-minute inventory check
- [ ] Social media ready to post
- [ ] Vercel dashboard open
- [ ] Shopify dashboard open
- [ ] Ready to switch to `live` mode

**At Launch Time:**

- [ ] Switch `NEXT_PUBLIC_DROP_MODE=live`
- [ ] Verify shop is visible
- [ ] Post launch announcement
- [ ] Monitor incoming orders
- [ ] Celebrate! 🥯

---

## 🎉 You're Ready!

Everything on this checklist? You're good to go!

**Remember:**
- Stay calm during the drop
- Monitor but don't panic
- Engage with customers
- Have fun!

Good luck with Drop 001! 🥯

---

*Keep this checklist handy throughout the entire launch process.*
