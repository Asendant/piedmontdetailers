# S3 Deployment Checklist

## Build Process
1. Run the full build: `npm run build`
   - This runs: `build:client` → `build:server` → `prerender`
   - The prerender step injects HTML content into the `dist/` files

## Files to Upload to S3
Upload **everything** from the `dist/` folder:
- `dist/index.html` (pre-rendered homepage)
- `dist/404.html` (404 fallback)
- `dist/about/index.html` (pre-rendered about page)
- `dist/services/index.html` (pre-rendered services page)
- `dist/gallery/index.html` (pre-rendered gallery page)
- `dist/blog/index.html` (pre-rendered blog page)
- `dist/videos/index.html` (pre-rendered videos page)
- `dist/contact/index.html` (pre-rendered contact page)
- `dist/booking/index.html` (pre-rendered booking page)
- `dist/admin/index.html` (pre-rendered admin page)
- `dist/assets/` folder (all JS and CSS files)
- `dist/robots.txt` and `dist/sitemap.xml` (if present)

## S3 Configuration
1. **Static Website Hosting**: Enable static website hosting
2. **Index Document**: Set to `index.html`
3. **Error Document**: Set to `404.html`
4. **Bucket Policy**: Make sure it allows public read access
5. **Content-Type**: Ensure HTML files have `text/html` content type

## Verify Deployment
After uploading, check:
1. View page source - should see HTML content in `<div id="root">` (even if minified)
2. The page should load without JavaScript errors
3. All routes should work (/, /services, /about, etc.)

## Troubleshooting
- If you only see meta tags: You uploaded the wrong `index.html` (source instead of dist)
- If pages don't load: Check that all `dist/assets/` files are uploaded
- If 404 errors: Make sure error document is set to `404.html` in S3 settings
