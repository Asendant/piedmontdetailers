# Backend Architecture

## Overview

The Piedmont Detailers backend is a serverless architecture built entirely on AWS services using AWS CDK. It provides APIs for email subscriptions, contact form submissions, and gallery management.

## Architecture Diagram

```
┌─────────────┐
│   Frontend  │
│  (React)    │
└──────┬──────┘
       │
       │ HTTPS
       ▼
┌─────────────────────────────────────┐
│      API Gateway (REST API)         │
│  - /subscribe                       │
│  - /contact                         │
│  - /gallery                         │
│  - /gallery/{id}                    │
│  - /gallery/upload-url              │
└──────┬──────────────────────────────┘
       │
       ├─────────────────┬─────────────────┬──────────────┐
       │                 │                 │              │
       ▼                 ▼                 ▼              ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Lambda    │  │   Lambda    │  │   Lambda    │  │   Lambda    │
│  Subscribe  │  │   Contact   │  │   Gallery   │  │  Presigned  │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                 │                 │              │
       │                 │                 │              │
       ▼                 ▼                 ▼              ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ DynamoDB    │  │     SES     │  │ DynamoDB    │  │     S3      │
│Subscriptions│  │   (Email)   │  │   Gallery   │  │   Images    │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
```

## Components

### 1. API Gateway
- **Purpose**: REST API endpoint for all backend services
- **Features**: 
  - CORS enabled for frontend access
  - Automatic scaling
  - Request/response logging

### 2. Lambda Functions

#### Subscribe Function
- **Endpoint**: `POST /subscribe`
- **Purpose**: Subscribe email to notification list
- **Actions**:
  - Validates email format
  - Stores in DynamoDB (SubscriptionsTable)
  - Sends confirmation email via SES
- **Response**: Success/error message

#### Contact Function
- **Endpoint**: `POST /contact`
- **Purpose**: Submit contact form
- **Actions**:
  - Validates form data
  - Sends email to business@piedmontdetailers.com via SES
- **Response**: Success/error message

#### List Gallery Function
- **Endpoint**: `GET /gallery`
- **Purpose**: Retrieve all gallery items
- **Actions**:
  - Scans DynamoDB (GalleryTable)
  - Returns items with S3 image URLs
  - Cached for 5 minutes
- **Response**: Array of gallery items

#### Upload Gallery Function
- **Endpoint**: `POST /gallery`
- **Purpose**: Create new gallery item
- **Actions**:
  - Validates input
  - Stores metadata in DynamoDB
  - Accepts S3 key or full URL for image
- **Response**: Created gallery item

#### Delete Gallery Function
- **Endpoint**: `DELETE /gallery/{id}`
- **Purpose**: Delete gallery item
- **Actions**:
  - Removes from DynamoDB
  - Optionally deletes S3 object
- **Response**: Success message

#### Get Presigned URL Function
- **Endpoint**: `POST /gallery/upload-url`
- **Purpose**: Get presigned URL for direct S3 upload
- **Actions**:
  - Generates unique S3 key
  - Creates presigned PUT URL (5 min expiry)
- **Response**: Upload URL and image URL

### 3. DynamoDB Tables

#### SubscriptionsTable
- **Key**: email (String)
- **Attributes**: 
  - email (Primary Key)
  - subscribedAt (ISO timestamp)
  - status (active/inactive)
- **Billing**: PAY_PER_REQUEST

#### GalleryTable
- **Key**: id (String)
- **Attributes**:
  - id (Primary Key)
  - title
  - packageType
  - imageUrl (S3 key or full URL)
  - description
  - createdAt (ISO timestamp)
- **Billing**: PAY_PER_REQUEST

### 4. S3 Bucket

#### GalleryBucket
- **Purpose**: Store gallery images
- **Features**:
  - Public read access
  - CORS enabled
  - Lifecycle policy (delete old versions after 30 days)
- **Structure**: `gallery/{uuid}.{ext}`

### 5. SES (Simple Email Service)

- **Purpose**: Send emails
- **Verified Identity**: business@piedmontdetailers.com
- **Usage**:
  - Subscription confirmations
  - Contact form submissions

## Data Flow

### Email Subscription Flow
1. User submits email in frontend
2. Frontend calls `POST /subscribe` with email
3. Lambda validates email
4. Lambda stores in DynamoDB
5. Lambda sends confirmation email via SES
6. Response returned to frontend

### Contact Form Flow
1. User submits contact form
2. Frontend calls `POST /contact` with form data
3. Lambda validates data
4. Lambda sends email to business@piedmontdetailers.com via SES
5. Response returned to frontend

### Gallery List Flow
1. User visits gallery page
2. Frontend calls `GET /gallery`
3. Lambda scans DynamoDB
4. Lambda constructs S3 URLs
5. Response with gallery items returned
6. Frontend lazy loads images

### Gallery Upload Flow
1. Admin uploads image (via presigned URL or direct)
2. Image stored in S3
3. Frontend calls `POST /gallery` with metadata
4. Lambda stores metadata in DynamoDB
5. Response with created item returned

## Performance Optimizations

### Gallery Loading
- **Lazy Loading**: Images use `loading="lazy"` attribute
- **Low Priority**: Images use `fetchPriority="low"`
- **Async Decoding**: Images use `decoding="async"`
- **Caching**: API responses cached for 5 minutes
- **S3 CDN**: Can be enhanced with CloudFront

### Lambda
- **Memory**: 256MB (optimized for cost)
- **Timeout**: 30 seconds (60s for upload)
- **Cold Start**: Minimal (Python 3.11 runtime)

### DynamoDB
- **On-Demand**: No minimum charges
- **Fast Reads**: Single-digit millisecond latency

## Security

### Current Implementation
- CORS enabled for frontend domain
- Input validation in Lambda functions
- SES email verification required
- S3 bucket policy for public reads

### Recommended Enhancements
- API keys for production
- Rate limiting
- CloudFront for S3 (better security)
- WAF (Web Application Firewall) for API Gateway
- Cognito for admin authentication

## Cost Optimization

### Current Costs (Low-Medium Traffic)
- **DynamoDB**: ~$0 (free tier covers most usage)
- **Lambda**: ~$0.20/month (1M requests free)
- **API Gateway**: ~$0 (1M requests free)
- **S3**: ~$0.50/month (storage + requests)
- **SES**: ~$0.10 per 1,000 emails

**Total**: < $5/month

### Scaling
- All services auto-scale
- No manual intervention needed
- Pay only for what you use

## Monitoring

### CloudWatch Logs
- All Lambda functions log to CloudWatch
- API Gateway access logs available
- Error tracking and debugging

### Metrics
- Lambda invocations, errors, duration
- API Gateway request count, latency
- DynamoDB read/write units
- S3 request metrics

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions.

### Quick Deploy
```bash
cd backend
npm run build
npm run deploy
```

## Maintenance

### Updates
1. Modify Lambda function code
2. Run `sam build`
3. Run `sam deploy`

### Monitoring
- Check CloudWatch logs for errors
- Monitor API Gateway metrics
- Review SES bounce/complaint rates

### Backup
- DynamoDB: Point-in-time recovery (optional)
- S3: Versioning enabled
- Code: Version controlled in Git
