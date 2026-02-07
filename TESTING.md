# Testing Guide

Quick guide to test all features of the Bagel Bros MVP.

## Prerequisites

Before testing, ensure:
- [x] Shopify store is set up
- [x] Products are added with `drop-001` tag
- [x] Environment variables are configured in `.env.local`
- [x] Dev server is running (`npm run dev`)

---

## Test Scenarios

### 1. Pre-Drop Mode Testing

**Setup:**
```env
NEXT_PUBLIC_DROP_MODE=pre-drop
NEXT_PUBLIC_DROP_DATE=2026-03-15T10:00:00Z
```

**Tests:**

✅ **Homepage**
- [ ] Countdown timer displays correctly
- [ ] Countdown updates every second
- [ ] "Join the 6-0 Club" heading visible
- [ ] Waitlist form is visible
- [ ] "Shop" link is NOT in header

✅ **Waitlist Form**
- [ ] Enter email: `test@example.com`
- [ ] Click "Join Waitlist"
- [ ] Success message: "You're officially in the 6-0 Club! 🥯"
- [ ] Form is replaced with confirmation
- [ ] Check Shopify → Customers → New customer with tags

✅ **Navigation**
- [ ] Click "About" → Brand manifesto loads
- [ ] Click "BAGEL BROS" logo → Returns to homepage
- [ ] Try `/shop` URL → Redirects to homepage

---

### 2. Live Mode Testing

**Setup:**
```env
NEXT_PUBLIC_DROP_MODE=live
```

Restart dev server: `Ctrl+C` then `npm run dev`

**Tests:**

✅ **Homepage**
- [ ] "The drop is live" message visible
- [ ] "Shop Drop 001" button visible
- [ ] Click button → Goes to `/shop`
- [ ] Countdown timer NOT visible

✅ **Shop Page**
- [ ] Products with `drop-001` tag are displayed
- [ ] Product images load correctly
- [ ] Product prices show correctly
- [ ] Low stock badges appear (if qty < 5)
- [ ] Click product → Goes to detail page

✅ **Product Detail Page**
- [ ] All product images display
- [ ] Product title and price visible
- [ ] Size selector shows all variants
- [ ] "Select a Size" text visible
- [ ] "Add to Cart" button is disabled initially

✅ **Size Selection**
- [ ] Click a size (e.g., "M")
- [ ] Size button highlights in bagel tan
- [ ] "Add to Cart" button becomes enabled
- [ ] Low stock message shows (if < 3 left)
- [ ] Sold out sizes are grayed out

✅ **Add to Cart**
- [ ] Click "Add to Cart"
- [ ] Success toast appears
- [ ] Cart drawer slides in from right
- [ ] Product appears in cart
- [ ] Cart icon badge shows item count
- [ ] Price displays correctly

✅ **Cart Drawer**
- [ ] Product image displays
- [ ] Product title and size show
- [ ] Quantity controls work (+ / -)
- [ ] "Remove" button works
- [ ] Subtotal updates correctly
- [ ] "Checkout" button is visible
- [ ] Click "View full cart" → Goes to `/cart`

✅ **Cart Page**
- [ ] All cart items display
- [ ] Quantity controls work
- [ ] Remove items works
- [ ] Order summary shows subtotal
- [ ] "Checkout" button visible
- [ ] Click "Checkout" → Redirects to Shopify

✅ **Shopify Checkout**
- [ ] Shopify checkout page loads
- [ ] Products and prices match cart
- [ ] Complete test order with test card
- [ ] Order confirmation received

✅ **Header**
- [ ] "Shop" link visible
- [ ] Cart icon shows item count
- [ ] Click cart icon → Opens cart drawer
- [ ] All links work on mobile

---

### 3. Sold-Out Mode Testing

**Setup:**
```env
NEXT_PUBLIC_DROP_MODE=sold-out
```

Restart dev server.

**Tests:**

✅ **Homepage**
- [ ] "Drop 001 is officially sold out" message
- [ ] "Get Early Access to Drop 002" heading
- [ ] Waitlist form visible (for Drop 002)
- [ ] Shop link NOT in header

✅ **Waitlist Form**
- [ ] Submit email
- [ ] Saves with `waitlist-drop-002` tag in Shopify
- [ ] Success confirmation shows

✅ **Shop URL**
- [ ] Visit `/shop` → Redirects to homepage
- [ ] Cannot access shop in sold-out mode

---

### 4. Mobile Responsive Testing

Test on actual device or browser DevTools (iPhone 12, Pixel 5).

✅ **Mobile Homepage**
- [ ] Text is readable (no horizontal scroll)
- [ ] Countdown timer grid fits screen
- [ ] Waitlist form is easy to use
- [ ] Button touch targets are large enough (44px+)

✅ **Mobile Shop**
- [ ] Product cards stack vertically
- [ ] Images load fast
- [ ] Tap product → Detail page loads

✅ **Mobile Product Detail**
- [ ] Images are full-width
- [ ] Size selector chips are tappable
- [ ] "Add to Cart" button is accessible
- [ ] Text is readable

✅ **Mobile Cart**
- [ ] Cart drawer fills screen nicely
- [ ] Can swipe to close (tap backdrop)
- [ ] Quantity controls are tappable
- [ ] Checkout button visible at bottom

---

### 5. Cross-Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

**Key checks:**
- Fonts load correctly
- Colors match design
- Cart drawer animates smoothly
- Checkout redirect works

---

### 6. Performance Testing

✅ **Lighthouse Audit**

Run in Chrome DevTools:
1. Open DevTools → Lighthouse tab
2. Select "Desktop" or "Mobile"
3. Click "Analyze page load"
4. Check scores:
   - [ ] Performance > 90
   - [ ] Accessibility > 90
   - [ ] Best Practices > 90
   - [ ] SEO > 90

✅ **Load Times**
- [ ] Homepage LCP < 2.5s
- [ ] Shop page LCP < 2.5s
- [ ] Product page LCP < 2.5s
- [ ] Images lazy load correctly

✅ **Network**
- [ ] Images use Next.js optimization
- [ ] No console errors
- [ ] API calls return 200 status

---

### 7. Error Handling Testing

✅ **Invalid Waitlist Email**
- [ ] Enter: `notanemail`
- [ ] Browser shows validation error
- [ ] Cannot submit

✅ **Empty Waitlist Email**
- [ ] Leave field blank
- [ ] Click submit
- [ ] Toast error: "Please enter your email"

✅ **Add to Cart Without Size**
- [ ] Don't select a size
- [ ] Try clicking "Add to Cart"
- [ ] Button is disabled

✅ **Product Not Found**
- [ ] Visit: `/shop/nonexistent-product`
- [ ] Should show 404 page

✅ **Empty Cart**
- [ ] Cart has no items
- [ ] Open cart drawer
- [ ] Shows "Your cart is empty" message
- [ ] Checkout button not visible

---

### 8. Data Persistence Testing

✅ **Cart Persistence**
- [ ] Add items to cart
- [ ] Refresh page
- [ ] Cart items still there (localStorage)
- [ ] Quantities preserved

✅ **Cart After Server Restart**
- [ ] Add items to cart
- [ ] Stop dev server (`Ctrl+C`)
- [ ] Start dev server (`npm run dev`)
- [ ] Refresh page
- [ ] Cart items still there

---

### 9. Shopify Integration Testing

✅ **Products Sync**
- [ ] Add new product in Shopify with `drop-001` tag
- [ ] Wait 30 seconds (ISR revalidation)
- [ ] Refresh `/shop` page
- [ ] New product appears

✅ **Inventory Updates**
- [ ] Reduce inventory to < 5 in Shopify
- [ ] Wait 30 seconds
- [ ] Refresh product page
- [ ] "Only X left" badge appears

✅ **Sold Out Variant**
- [ ] Set variant inventory to 0 in Shopify
- [ ] Wait 30 seconds
- [ ] Refresh product page
- [ ] Size button is grayed out

✅ **Waitlist Customers**
- [ ] Submit waitlist form
- [ ] Check Shopify → Customers
- [ ] Verify customer exists with:
   - Email matches
   - Tags: `waitlist-drop-001`, `6-0-club`
   - Accepts marketing: true

---

### 10. Edge Cases

✅ **Empty Product List**
- [ ] Remove `drop-001` tag from all products
- [ ] Visit `/shop`
- [ ] Shows "No products available" message

✅ **Product With No Images**
- [ ] Create product without images
- [ ] Tag with `drop-001`
- [ ] Visit `/shop`
- [ ] Shows "No Image" placeholder

✅ **Single Variant Product**
- [ ] Create product with only 1 size
- [ ] Visit product page
- [ ] Size selector shows single option

✅ **Very Long Product Title**
- [ ] Create product with 100+ character title
- [ ] Check card truncation on `/shop`
- [ ] Full title visible on product page

---

## Test Checklist Summary

Use this quick checklist before launch:

**Pre-Drop Mode:**
- [ ] Countdown works
- [ ] Waitlist saves to Shopify
- [ ] Shop is disabled

**Live Mode:**
- [ ] Products display
- [ ] Add to cart works
- [ ] Checkout redirects to Shopify
- [ ] Test order completes

**Sold-Out Mode:**
- [ ] Sold-out message shows
- [ ] Drop 002 waitlist works
- [ ] Shop is disabled

**General:**
- [ ] Mobile responsive
- [ ] Fast load times (<2s)
- [ ] No console errors
- [ ] All links work
- [ ] Images optimized
- [ ] Cart persists

---

## Automated Testing (Optional)

For future development, consider adding:
- **Unit tests:** Jest + React Testing Library
- **E2E tests:** Playwright or Cypress
- **Visual regression:** Percy or Chromatic

---

## Reporting Issues

If you find bugs during testing:

1. **Note the details:**
   - What you did
   - What happened
   - What should have happened
   - Browser and device

2. **Check console:**
   - Open DevTools → Console
   - Copy any error messages

3. **Check Network:**
   - DevTools → Network tab
   - Look for failed requests

---

## Quick Test Script

Run this to test all drop modes quickly:

```bash
# Test pre-drop
export NEXT_PUBLIC_DROP_MODE=pre-drop
npm run dev
# Test in browser, then Ctrl+C

# Test live
export NEXT_PUBLIC_DROP_MODE=live
npm run dev
# Test in browser, then Ctrl+C

# Test sold-out
export NEXT_PUBLIC_DROP_MODE=sold-out
npm run dev
# Test in browser
```

---

**Testing Complete?** ✅

You're ready to deploy! See `DEPLOYMENT.md` for next steps.
