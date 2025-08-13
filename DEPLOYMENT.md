# Deployment Guide - AffiliateHub

This guide will help you deploy your affiliate marketing website to various platforms.

## 🚀 Quick Deploy Options

### 1. Netlify (Recommended)

**Step 1: Prepare Your Repository**
```bash
# Make sure all files are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

**Step 2: Deploy to Netlify**
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Connect your GitHub account
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

**Step 3: Configure Domain**
1. Go to Site settings > Domain management
2. Add your custom domain
3. Update DNS settings as instructed

### 2. Vercel

**Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

**Step 2: Deploy**
```bash
vercel
```

**Step 3: Follow the prompts**
- Link to existing project or create new
- Set build command: `npm run build`
- Set output directory: `dist`

### 3. GitHub Pages

**Step 1: Update Vite Config**
```javascript
// vite.config.js
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

**Step 2: Add GitHub Actions**
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '18'
    - run: npm install
    - run: npm run build
    - uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 🔧 Pre-Deployment Checklist

### 1. Update Configuration Files

**Update Domain in Files:**
- `index.html` - Update canonical URLs
- `sitemap.xml` - Replace `yourdomain.com` with your actual domain
- `robots.txt` - Update sitemap URL
- `src/App.jsx` - Update meta tag URLs

**Example Updates:**
```html
<!-- index.html -->
<link rel="canonical" href="https://your-actual-domain.com" />
<meta property="og:url" content="https://your-actual-domain.com" />

<!-- sitemap.xml -->
<loc>https://your-actual-domain.com/</loc>

<!-- robots.txt -->
Sitemap: https://your-actual-domain.com/sitemap.xml
```

### 2. Update Content

**Replace Placeholder Content:**
- Company information in `Footer.jsx`
- Contact details in `Contact.jsx`
- Product data in page components
- Affiliate links with your actual links

**Update Branding:**
- Colors in `tailwind.config.js`
- Logo and brand name
- Meta descriptions and titles

### 3. Test Locally

```bash
# Build the project
npm run build

# Test the build locally
npm run preview
```

## 🌐 Domain Configuration

### Custom Domain Setup

**For Netlify:**
1. Go to Site settings > Domain management
2. Add custom domain
3. Update DNS records:
   - A record: `@` → `75.2.60.5`
   - CNAME record: `www` → `your-site.netlify.app`

**For Vercel:**
1. Go to Project settings > Domains
2. Add your domain
3. Update DNS records as shown in Vercel dashboard

## 📊 Post-Deployment

### 1. Verify Deployment

**Check These URLs:**
- `https://yourdomain.com` - Homepage loads
- `https://yourdomain.com/products` - Products page
- `https://yourdomain.com/about` - About page
- `https://yourdomain.com/contact` - Contact page
- `https://yourdomain.com/sitemap.xml` - Sitemap accessible
- `https://yourdomain.com/robots.txt` - Robots file accessible

### 2. SEO Verification

**Google Search Console:**
1. Add your property
2. Verify ownership
3. Submit sitemap
4. Monitor indexing

**Analytics Setup:**
1. Google Analytics 4
2. Google Tag Manager (optional)
3. Affiliate tracking tools

### 3. Performance Testing

**Lighthouse Audit:**
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

**Target Scores:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 100

## 🔒 Security & SSL

### SSL Certificate
- Netlify/Vercel provide automatic SSL
- Ensure HTTPS is enforced
- Update any HTTP links to HTTPS

### Security Headers
Add to your hosting platform:
```http
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'
```

## 📱 Mobile Testing

### Test on Multiple Devices
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)
- Desktop browsers

### Check Responsive Design
- Navigation menu
- Product cards
- Contact forms
- Footer links

## 🔄 Continuous Deployment

### Automatic Deployments
- Connect your Git repository
- Set up automatic deployments on push
- Configure preview deployments for pull requests

### Environment Variables
Set these in your hosting platform:
```bash
VITE_API_URL=your-api-url
VITE_ANALYTICS_ID=your-ga-id
VITE_AFFILIATE_TRACKING=your-tracking-id
```

## 🚨 Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Routing Issues:**
- Ensure `_redirects` file is in `public/` folder
- Check SPA routing configuration
- Verify all routes work after deployment

**SEO Issues:**
- Check meta tags are loading
- Verify sitemap is accessible
- Test robots.txt

### Performance Issues

**Optimize Images:**
- Use WebP format
- Implement lazy loading
- Compress images

**Code Splitting:**
- Vite handles this automatically
- Monitor bundle sizes
- Use dynamic imports if needed

## 📞 Support

If you encounter issues:
1. Check the hosting platform's documentation
2. Review the error logs
3. Test locally first
4. Contact platform support if needed

## 🎉 Success!

Once deployed successfully:
1. Share your website URL
2. Set up monitoring and analytics
3. Start promoting your affiliate links
4. Monitor performance and conversions
5. Regularly update content and products

---

**Remember:** Always test thoroughly before going live with real affiliate links and products!
