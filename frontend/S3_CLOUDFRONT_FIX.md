# Fix: Google Search Console "Redirect" Error for Root Page

## Problem
Google Search Console reports that `piedmontdetailers.com/` is a redirect and cannot be indexed. This happens when S3 or CloudFront redirects `/` to `/index.html` instead of serving it directly.

## Solution Options

### Option 1: CloudFront Function (Recommended if using CloudFront)

If you're using CloudFront, create a CloudFront Function to rewrite the request:

1. **Go to CloudFront Console** → Functions → Create Function
2. **Function Name**: `rewrite-index`
3. **Function Code**:
```javascript
function handler(event) {
    var request = event.request;
    var uri = request.uri;
    
    // Check whether the URI is missing a file name.
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    }
    // Check whether the URI is missing a file extension.
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }
    
    return request;
}
```

4. **Associate the function** with your CloudFront distribution:
   - Go to your distribution → Behaviors → Edit
   - Under "Function associations", select "Viewer request"
   - Choose your function

### Option 2: Lambda@Edge (More Control)

If you need more control, use Lambda@Edge:

1. **Create Lambda Function** (Node.js 18.x or later)
2. **Code**:
```javascript
exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const uri = request.uri;
    
    // Rewrite requests for root or directories
    if (uri === '/' || (!uri.includes('.') && !uri.endsWith('/'))) {
        request.uri = uri === '/' ? '/index.html' : uri + '/index.html';
    }
    
    callback(null, request);
};
```

3. **Deploy to Lambda@Edge** (must be in `us-east-1` region)
4. **Associate with CloudFront** distribution

### Option 3: S3 Bucket Configuration (If NOT using CloudFront)

If you're using S3 static website hosting directly (no CloudFront):

1. **Enable Static Website Hosting** in S3 bucket
2. **Set Index Document**: `index.html`
3. **Set Error Document**: `404.html`
4. **Important**: Make sure you're using the **Website Endpoint URL**, not the bucket URL
   - Website endpoint: `http://your-bucket.s3-website-us-east-1.amazonaws.com`
   - NOT: `https://your-bucket.s3.amazonaws.com`

### Option 4: CloudFront Origin Request Policy (Simplest)

If using CloudFront with S3:

1. **Go to CloudFront Distribution** → Origins
2. **Edit your S3 origin**
3. **Origin Domain**: Use the S3 website endpoint (not the bucket endpoint)
   - Format: `your-bucket.s3-website-us-east-1.amazonaws.com`
4. **Origin Path**: Leave empty
5. **Save**

## Verify the Fix

After implementing one of the above:

1. **Test the URL directly**:
   ```bash
   curl -I https://piedmontdetailers.com/
   ```
   Should return `200 OK`, not `301` or `302`

2. **Check in browser**:
   - Open DevTools → Network tab
   - Visit `https://piedmontdetailers.com/`
   - Check the response status (should be 200, not 301/302)

3. **Test in Google Search Console**:
   - Use "URL Inspection" tool
   - Enter `https://piedmontdetailers.com/`
   - Should show "URL is on Google" and "Page is indexed"

## Common Mistakes

1. ❌ Using S3 bucket endpoint instead of website endpoint
2. ❌ CloudFront pointing to bucket instead of website endpoint
3. ❌ Missing trailing slash handling
4. ❌ Not setting proper cache behaviors in CloudFront

## Recommended Setup

**Best Practice**: Use CloudFront with S3 website endpoint + CloudFront Function

This gives you:
- ✅ Direct serving (no redirects)
- ✅ Fast CDN performance
- ✅ Proper caching
- ✅ HTTPS support
