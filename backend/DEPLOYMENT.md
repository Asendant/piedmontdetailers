# Backend Deployment Guide

This guide will walk you through deploying the Piedmont Detailers backend to AWS using CDK.

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
   ```bash
   aws configure
   ```
3. **Node.js** (v18 or later) - [Download](https://nodejs.org/)
4. **Python** (3.11 or later) - [Download](https://www.python.org/downloads/)
5. **AWS CDK CLI** installed
   ```bash
   npm install -g aws-cdk
   ```

## Step 1: Verify Prerequisites

```bash
# Check Node.js
node --version

# Check Python
python --version

# Check AWS CLI
aws --version

# Check CDK CLI
cdk --version
```

## Step 2: Install Dependencies

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt
```

## Step 3: Bootstrap CDK (First Time Only)

CDK needs to be bootstrapped once per AWS account/region:

```bash
npm run bootstrap
```

Or manually:
```bash
cdk bootstrap
```

This creates the necessary S3 bucket and IAM roles for CDK deployments.

## Step 4: Configure SES Email

Before deploying, you need to verify your email address in AWS SES:

1. Go to AWS SES Console: https://console.aws.amazon.com/ses/
2. Click "Verified identities" → "Create identity"
3. Choose "Email address"
4. Enter: `business@piedmontdetailers.com`
5. Check your email and click the verification link

**Important**: If your AWS account is in SES sandbox mode, you can only send emails to verified addresses. To send to any email:
- Request production access in SES Console
- Or verify the domain instead of just the email

## Step 5: Deploy the Backend

### Using npm scripts (Recommended)
```bash
cd backend

# Build the stack
npm run build

# Deploy (will prompt for approval)
npm run deploy
```

### Using CDK directly
```bash
cd backend

# Synthesize CloudFormation template
cdk synth

# Deploy
cdk deploy
```

During deployment, CDK will:
- Show you what resources will be created
- Ask for approval (unless using `--require-approval never`)
- Create all AWS resources
- Output the API Gateway URL

## Step 6: Get API Gateway URL and Update Frontend

After deployment, generate the API endpoints JSON:

```bash
cd backend
npm run generate-endpoints
```

This automatically:
- Fetches the API Gateway URL from CloudFormation
- Updates `frontend/public/api-endpoints.json`

Or manually get the URL:
```bash
npm run get-api-url
```

Then update `frontend/public/api-endpoints.json`:

```json
{
  "baseUrl": "https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod",
  "subscribe": "https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/subscribe",
  "contact": "https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/contact",
  "gallery": "https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/gallery",
  "galleryUploadUrl": "https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/gallery/upload-url"
}
```

## Step 7: Test the API

### Test Email Subscription
```bash
curl -X POST https://YOUR_API_URL/prod/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Test Contact Form
```bash
curl -X POST https://YOUR_API_URL/prod/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "(336) 555-1234",
    "vehicle": "2020 Toyota Camry",
    "service": "Full Wash Package",
    "location": "Greensboro, NC",
    "notes": "Test message"
  }'
```

### Test Gallery List
```bash
curl https://YOUR_API_URL/prod/gallery
```

## Troubleshooting

### CDK Bootstrap Required

If you see:
```
This stack uses assets, so the toolkit stack must be deployed to the environment
```

Run:
```bash
npm run bootstrap
```

### SES Email Not Sending

1. **Check SES Verification**
   - Go to SES Console → Verified identities
   - Ensure `business@piedmontdetailers.com` is verified

2. **Check SES Sandbox Mode**
   - If in sandbox, you can only send to verified emails
   - Request production access or verify the domain

3. **Check CloudWatch Logs**
   - Go to CloudWatch → Log groups
   - Find Lambda function logs
   - Look for SES errors

### CORS Errors

1. **Verify CORS Configuration**
   - Check `piedmont_detailers_stack.py` has CORS enabled
   - Ensure frontend URL matches allowed origins

2. **Check API Gateway**
   - Go to API Gateway Console
   - Verify CORS is enabled on all methods

### Lambda Timeout

1. **Increase Timeout**
   - Edit `piedmont_detailers_stack.py`
   - Increase `timeout` parameter in Lambda function definitions

2. **Check Function Logs**
   - CloudWatch → Log groups → Function name
   - Look for timeout errors

### API Gateway Not Found

1. **Check Stack Status**
   ```bash
   aws cloudformation describe-stacks --stack-name PiedmontDetailersBackend
   ```

2. **Check API Gateway Console**
   - Verify API exists and is deployed
   - Check stage name matches (`prod`)

## Updating the Backend

To update after making changes:

```bash
cd backend
npm run build
npm run deploy
```

CDK will show you what will change and ask for approval.

## Destroying the Stack

To remove all resources:

```bash
cd backend
npm run destroy
```

Or:
```bash
cdk destroy
```

**Warning**: This will delete all resources including DynamoDB tables and S3 buckets (unless they have `RemovalPolicy.RETAIN`).

## Cost Estimation

Approximate monthly costs (varies by usage):

- **DynamoDB**: $0 (PAY_PER_REQUEST, free tier covers most usage)
- **Lambda**: ~$0.20 per million requests (free tier: 1M requests/month)
- **API Gateway**: Free tier: 1M requests/month, then $3.50 per million
- **S3**: ~$0.023 per GB storage, $0.005 per 1,000 requests
- **SES**: $0.10 per 1,000 emails

**Estimated total**: < $5/month for low-medium traffic

## Security Considerations

1. **API Keys**: Consider adding API keys for production
2. **CORS**: Restrict CORS to your domain in production
3. **S3 Bucket**: Consider CloudFront for better performance and security
4. **Rate Limiting**: Add rate limiting to prevent abuse
5. **Input Validation**: Already implemented in Lambda functions

## Next Steps

1. Set up CloudFront distribution for S3 bucket (optional, for better performance)
2. Add API authentication if needed
3. Set up monitoring and alerts
4. Configure custom domain for API Gateway (optional)
