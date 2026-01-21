# CloudFront "Error from cloudfront" Troubleshooting

## Your Current Error Page Configuration

Your error pages look correct for an SPA:
- **403 → /index.html (200)** ✅
- **404 → /index.html (200)** ✅

These are fine and won't cause redirect issues.

## The Real Problem: Origin Configuration

The `x-cache: Error from cloudfront` header means CloudFront is **failing to reach your origin**, not that it's serving an error page. This happens **before** your error page rules apply.

## Most Common Cause: Wrong Origin Type

CloudFront can point to S3 in two ways:

### ❌ WRONG: S3 Bucket Origin (REST API)
- **Origin Domain**: `your-bucket.s3.amazonaws.com` or `your-bucket.s3.us-east-1.amazonaws.com`
- **Origin Access**: OAC (Origin Access Control) or OAI (Origin Access Identity)
- **Problem**: This doesn't support directory index files properly
- **Result**: CloudFront errors when trying to serve `/` or directories

### ✅ CORRECT: S3 Website Endpoint
- **Origin Domain**: `your-bucket.s3-website-us-east-1.amazonaws.com` (or your region)
- **Origin Access**: None needed (website endpoints are public)
- **Works**: Properly serves `index.html` for `/` and directories

## How to Fix

### Step 1: Check Your Current Origin

1. Go to **CloudFront Console** → Your Distribution
2. Click **Origins** tab
3. Click on your S3 origin
4. Check the **Origin Domain** field

**If it looks like**: `your-bucket.s3.amazonaws.com` or `your-bucket.s3.us-east-1.amazonaws.com`
→ **This is wrong!**

**If it looks like**: `your-bucket.s3-website-us-east-1.amazonaws.com`
→ **This is correct!**

### Step 2: Fix the Origin (If Wrong)

**Option A: Update Existing Origin**

1. Click **Edit** on your origin
2. Change **Origin Domain** to: `your-bucket.s3-website-us-east-1.amazonaws.com`
   - Replace `your-bucket` with your actual bucket name
   - Replace `us-east-1` with your bucket's region if different
3. **Remove** any Origin Access Control/Identity settings
4. **Origin Path**: Leave empty
5. Save

**Option B: Create New Origin (Recommended)**

1. Create a new origin:
   - **Origin Domain**: `your-bucket.s3-website-us-east-1.amazonaws.com`
   - **Name**: `S3-Website-Endpoint` (or similar)
   - **Origin Path**: (empty)
   - **Origin Access**: None
2. Update your default behavior to use the new origin
3. Save distribution

### Step 3: Verify S3 Website Hosting is Enabled

1. Go to **S3 Console** → Your Bucket
2. Click **Properties** tab
3. Scroll to **Static website hosting**
4. Should show:
   - **Status**: Enabled
   - **Hosting type**: Bucket hosting
   - **Index document**: `index.html`
   - **Error document**: `404.html` (or `index.html`)

If not enabled:
1. Click **Edit**
2. Enable static website hosting
3. Set index document to `index.html`
4. Save

### Step 4: Test After Changes

After updating CloudFront (can take 5-15 minutes to propagate):

```bash
curl -I https://piedmontdetailers.com/
```

**Good response**:
```
x-cache: Hit from cloudfront
# or
x-cache: Miss from cloudfront
```

**Bad response** (what you're seeing now):
```
x-cache: Error from cloudfront
```

## Why This Happens

- **S3 Bucket Endpoint (REST API)**: Designed for API access, doesn't understand "directory index" concept
- **S3 Website Endpoint**: Designed for web hosting, automatically serves `index.html` for `/` and directories

When CloudFront tries to fetch `/` from a bucket endpoint, it fails because there's no object at that path. The website endpoint knows to serve `index.html` instead.

## Additional Checks

1. **Bucket Policy**: Make sure your bucket allows public read access (if using website endpoint)
2. **CloudFront Cache**: After fixing, you may need to invalidate:
   - CloudFront Console → Your Distribution → Invalidations
   - Create invalidation for `/*`
3. **Wait for Propagation**: CloudFront changes can take 5-15 minutes

## Your Error Pages Are Fine

Your error page configuration (403/404 → /index.html with 200) is correct for a SPA. The issue is that CloudFront is erroring **before** it can apply those rules because it can't reach the origin properly.
