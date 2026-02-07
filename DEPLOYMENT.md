# Deployment Guide

## Quick Deploy to Vercel

### 1. Prerequisites
- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Shopify store configured (see SETUP.md)

### 2. Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Bagel Bros MVP"

# Rename branch to main
git branch -M main

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/bagel-bros.git

# Push to GitHub
git push -u origin main
```

### 3. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your `bagel-bros` repository
4. Click "Import"

### 4. Configure Environment Variables

In the Vercel import screen, add these environment variables:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxxxxxxxxxxxx
SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxxxxxxxxxxxx
NEXT_PUBLIC_DROP_MODE=pre-drop
NEXT_PUBLIC_DROP_DATE=2026-03-15T10:00:00Z
```

**Important:** Replace the values with your actual Shopify credentials.

### 5. Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Visit your deployed site at `https://your-project.vercel.app`

---

## Drop Mode Management

### Changing Drop Modes (No Redeploy Needed!)

1. **Go to Vercel Dashboard**
   - Navigate to your project
   - Click "Settings" → "Environment Variables"

2. **Update `NEXT_PUBLIC_DROP_MODE`**
   - Edit the variable
   - Change value to: `pre-drop`, `live`, or `sold-out`
   - Click "Save"

3. **Changes take effect immediately** (no redeploy needed)

### Drop Mode Timeline

**Phase 1: Pre-Drop (2-4 weeks before launch)**
```
NEXT_PUBLIC_DROP_MODE=pre-drop
```
- Countdown timer active
- Waitlist form visible
- Shop disabled
- Build hype and collect emails

**Phase 2: Live (Drop day)**
```
NEXT_PUBLIC_DROP_MODE=live
```
- Shop enabled
- Products visible
- Cart and checkout active
- Monitor inventory

**Phase 3: Sold Out (After sellout)**
```
NEXT_PUBLIC_DROP_MODE=sold-out
```
- Shop disabled
- Sold out messaging
- Drop 002 waitlist active
- Start planning next drop

---

## Custom Domain Setup

### 1. Add Domain in Vercel

1. Go to Project → Settings → Domains
2. Enter your domain: `bagelbros.com`
3. Click "Add"

### 2. Configure DNS

Vercel will provide DNS records. Add these to your domain registrar:

**Option A: Use Vercel nameservers (recommended)**
- Update nameservers at your registrar
- Vercel handles everything automatically

**Option B: Add A/CNAME records**
- Add the A record or CNAME record provided
- Wait for DNS propagation (5 minutes to 48 hours)

### 3. SSL Certificate

- Vercel automatically provisions SSL
- Your site will be HTTPS within minutes
- No additional configuration needed

---

## Performance Optimization

### Vercel Analytics (Optional but Recommended)

1. Go to Project → Analytics
2. Enable Vercel Analytics (free tier available)
3. Monitor:
   - Core Web Vitals
   - Real User Monitoring
   - Page load performance

### Image Optimization

- Already configured via Next.js Image component
- Images are automatically optimized and served from Vercel CDN
- No additional setup needed

### Edge Caching

- Product pages revalidate every 30 seconds
- Static pages are cached globally
- Configured in `app/shop/page.tsx` via `revalidate = 30`

---

## Monitoring and Maintenance

### Daily Drop Monitoring

During active drop, monitor:

1. **Vercel Dashboard**
   - Function invocations
   - Build status
   - Error logs

2. **Shopify Dashboard**
   - Orders
   - Inventory levels
   - Customer messages

3. **Site Performance**
   - Load times
   - Cart functionality
   - Checkout flow

### Log Viewing

**Vercel Function Logs:**
1. Project → Deployments
2. Click latest deployment
3. Click "Functions" tab
4. View real-time logs

**Shopify Logs:**
1. Shopify Admin → Settings → Apps
2. View API usage and errors

---

## Rollback Procedure

If something goes wrong:

1. **Go to Vercel Dashboard**
2. **Deployments** tab
3. **Find previous working deployment**
4. **Click "⋮" menu → "Promote to Production"**

Changes take effect in seconds.

---

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Yes | Your Shopify store domain | `your-store.myshopify.com` |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Yes | Storefront API token | `shpat_xxxxx` |
| `SHOPIFY_ADMIN_ACCESS_TOKEN` | Yes | Admin API token (for waitlist) | `shpat_xxxxx` |
| `NEXT_PUBLIC_DROP_MODE` | Yes | Current drop state | `pre-drop`, `live`, or `sold-out` |
| `NEXT_PUBLIC_DROP_DATE` | Yes | Drop launch date/time | `2026-03-15T10:00:00Z` |

---

## Troubleshooting Deployment

### Build fails with "Missing environment variables"
- Ensure all required env vars are set in Vercel
- Check for typos in variable names
- Verify tokens are correct

### Products not showing after deployment
- Check `NEXT_PUBLIC_DROP_MODE` is set to `live`
- Verify products have `drop-001` tag in Shopify
- Check Shopify API credentials are production tokens

### Waitlist emails not saving
- Verify `SHOPIFY_ADMIN_ACCESS_TOKEN` has `write_customers` scope
- Check function logs in Vercel for errors
- Test API endpoint directly: `/api/waitlist`

### Site loads slowly
- Enable Vercel Analytics to identify bottlenecks
- Check image sizes (should be <500KB)
- Verify CDN is serving static assets

---

## Security Best Practices

1. **Never commit `.env.local` to Git**
   - Already in `.gitignore`
   - Keep credentials secure

2. **Rotate API tokens regularly**
   - Every 3-6 months
   - After team member changes

3. **Use environment-specific tokens**
   - Development: Use test/dev tokens
   - Production: Use production tokens

4. **Enable Vercel deployment protection**
   - Settings → General → Deployment Protection
   - Require preview branch authentication

---

## Scaling Considerations

### Traffic Spikes (Drop Day)

Vercel automatically handles scaling:
- Serverless functions scale to demand
- CDN serves static content globally
- No manual intervention needed

### Rate Limits

Shopify Storefront API limits:
- Default: 50 requests/second
- If you hit limits, contact Shopify to increase

### Concurrent Checkouts

Shopify handles checkout infrastructure:
- Supports high concurrency
- Battle-tested for flash sales
- No configuration needed

---

## Post-Launch Checklist

After deploying to production:

- [ ] Test homepage loads correctly
- [ ] Verify countdown timer shows correct date
- [ ] Test waitlist form submission
- [ ] Confirm email saves to Shopify Customers
- [ ] Test on mobile device (iOS Safari + Android Chrome)
- [ ] Verify shop page when mode = `live`
- [ ] Complete test order end-to-end
- [ ] Check confirmation page
- [ ] Test cart drawer functionality
- [ ] Verify analytics are tracking
- [ ] Set up uptime monitoring (optional)

---

## Support

- **Vercel Issues:** [vercel.com/support](https://vercel.com/support)
- **Shopify Issues:** Shopify Help Center
- **Next.js Issues:** [nextjs.org/docs](https://nextjs.org/docs)

Good luck with your drop! 🥯
