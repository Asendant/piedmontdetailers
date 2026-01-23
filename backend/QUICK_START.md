# Quick Start Guide

## 1. Install Prerequisites

```bash
# Install Node.js (v18+)
# Download from: https://nodejs.org/

# Install Python (3.11+)
# Download from: https://www.python.org/downloads/

# Install AWS CLI
# Windows: Download from AWS website
# Mac: brew install awscli
# Linux: sudo apt-get install awscli

# Install CDK CLI
npm install -g aws-cdk

# Configure AWS credentials
aws configure
```

## 2. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

## 3. Bootstrap CDK (First Time Only)

```bash
npm run bootstrap
```

## 4. Verify SES Email

1. Go to https://console.aws.amazon.com/ses/
2. Click "Verified identities" → "Create identity"
3. Enter: `business@piedmontdetailers.com`
4. Verify the email

## 5. Deploy

```bash
# Build
npm run build

# Deploy
npm run deploy
```

## 6. Get API URL and Update Frontend

```bash
npm run generate-endpoints
```

## 7. Test

Open your frontend and test:
- Email subscription form
- Contact form
- Gallery page

Done! 🎉
