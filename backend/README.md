# Piedmont Detailers Backend

Serverless backend API for Piedmont Detailers built with AWS CDK, Lambda, DynamoDB, S3, and API Gateway.

## Architecture

- **API Gateway**: REST API endpoints
- **Lambda Functions**: Serverless compute for business logic
- **DynamoDB**: NoSQL database for subscriptions and gallery metadata
- **S3**: Object storage for gallery images
- **SES**: Email service for contact form and subscription confirmations

## Features

1. **Email Subscription** (`/subscribe`)
   - Stores email addresses in DynamoDB
   - Sends confirmation email via SES

2. **Contact Form** (`/contact`)
   - Sends form submissions to business@piedmontdetailers.com via SES

3. **Gallery Management** (`/gallery`)
   - List gallery items (GET)
   - Upload gallery items (POST)
   - Delete gallery items (DELETE /gallery/{id})
   - Get presigned URL for direct S3 upload (POST /gallery/upload-url)

## Prerequisites

- **Node.js** (v18 or later)
- **Python** (3.11 or later)
- **AWS CLI** installed and configured
- **AWS CDK CLI** installed (`npm install -g aws-cdk`)
- **AWS account** with appropriate permissions
- **SES email domain/address verified** (for email sending)

## Installation

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Bootstrap CDK** (only needed once per account/region):
   ```bash
   npm run bootstrap
   ```

## Deployment

### Using npm scripts (Recommended)
```bash
# Build the CDK stack
npm run build

# Deploy (will prompt for approval)
npm run deploy

# Deploy to production (no prompts)
npm run deploy:prod

# See what would change
npm run diff

# Generate API endpoints JSON for frontend
npm run generate-endpoints
```

### Alternative: Direct CDK commands
```bash
cdk synth      # Build/synthesize CloudFormation template
cdk deploy      # Deploy the stack
cdk diff        # See differences
cdk destroy     # Remove the stack
```

## Post-Deployment Setup

1. **Verify SES Email**
   - Go to AWS SES Console
   - Verify the email address: `business@piedmontdetailers.com`
   - If using a domain, verify the domain instead

2. **Get API Gateway URL and Update Frontend**
   ```bash
   npm run generate-endpoints
   ```
   This automatically fetches the API Gateway URL and updates `frontend/public/api-endpoints.json`

   Or manually:
   - After deployment, the API Gateway URL will be shown in the outputs
   - Or check CloudFormation stack outputs in AWS Console
   - Update `frontend/public/api-endpoints.json` with the actual URL

3. **Configure CORS** (if needed)
   - CORS is already configured in the CDK stack
   - Adjust `allow_origins` in `piedmont_detailers_stack.py` if needed

## API Endpoints

After deployment, you'll get an API Gateway URL like:
`https://{api-id}.execute-api.{region}.amazonaws.com/prod`

### Endpoints:
- `POST /subscribe` - Subscribe to email list
- `POST /contact` - Submit contact form
- `GET /gallery` - List all gallery items
- `POST /gallery` - Create gallery item
- `DELETE /gallery/{id}` - Delete gallery item
- `POST /gallery/upload-url` - Get presigned URL for image upload

## Environment Variables

Set in `piedmont_detailers_stack.py`:
- `GALLERY_TABLE_NAME`: DynamoDB table for gallery items
- `SUBSCRIPTIONS_TABLE_NAME`: DynamoDB table for email subscriptions
- `GALLERY_BUCKET_NAME`: S3 bucket for gallery images
- `CONTACT_EMAIL`: Email address for contact form submissions
- `REGION`: AWS region

## Testing

After deployment, test the API endpoints:

```bash
# Subscribe
curl -X POST https://{api-url}/prod/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Contact form
curl -X POST https://{api-url}/prod/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "(336) 555-1234",
    "vehicle": "2020 Toyota Camry",
    "service": "Full Wash Package",
    "location": "Greensboro, NC",
    "notes": "Test message"
  }'

# List gallery
curl https://{api-url}/prod/gallery
```

## Cost Optimization

- DynamoDB uses PAY_PER_REQUEST billing (no minimum charges)
- Lambda functions have 256MB memory (adjustable)
- S3 lifecycle policies clean up old versions
- API Gateway has free tier (1M requests/month)

## Troubleshooting

1. **SES Email Not Sending**
   - Verify email address/domain in SES Console
   - Check SES is out of sandbox mode (if sending to unverified emails)
   - Check CloudWatch logs for Lambda errors

2. **CORS Errors**
   - Verify CORS configuration in `piedmont_detailers_stack.py`
   - Check API Gateway CORS settings
   - Ensure frontend uses correct API URL

3. **Lambda Timeout**
   - Increase timeout in `piedmont_detailers_stack.py` (default: 30s)
   - Check CloudWatch logs for errors

4. **CDK Bootstrap Required**
   - If you see "requires bootstrap", run: `npm run bootstrap`
   - This only needs to be done once per AWS account/region

## Security Notes

- API Gateway endpoints are public (add authentication if needed)
- S3 bucket has public read access for images (consider CloudFront)
- SES requires verified email addresses/domains
- Consider adding API keys or Cognito authentication for production
