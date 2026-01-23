# Troubleshooting SES Email Issues

## Problem: Contact form says "successfully submitted" but no email arrives

This is almost always an SES (Simple Email Service) configuration issue.

## Step 1: Check CloudWatch Logs

1. Go to AWS CloudWatch Console: https://console.aws.amazon.com/cloudwatch/
2. Click "Log groups" in the left sidebar
3. Find and click on: `/aws/lambda/piedmont-detailers-contact`
4. Click on the most recent log stream
5. Look for errors - they will show the exact SES error

Common errors you might see:
- `MessageRejected` - Email address not verified
- `MailFromDomainNotVerifiedException` - Domain not verified
- `AccountSendingPausedException` - Account sending is paused

## Step 2: Verify Email Address in SES

1. Go to AWS SES Console: https://console.aws.amazon.com/ses/
2. Make sure you're in the correct region (us-east-1 or your deployment region)
3. Click "Verified identities" in the left sidebar
4. Click "Create identity"
5. Choose "Email address"
6. Enter: `business@piedmontdetailers.com`
7. Click "Create identity"
8. Check your email inbox (including spam folder)
9. Click the verification link in the email

**Important**: The email address MUST be verified before SES will send emails.

## Step 3: Check SES Sandbox Mode

If your AWS account is new, SES might be in "sandbox mode":

1. Go to SES Console → "Account dashboard"
2. Look for "Sending quota" and "Production access"

**Sandbox Mode Limitations:**
- Can only send emails TO verified email addresses
- Can only send emails FROM verified email addresses
- Limited to 200 emails per day

**To Request Production Access:**
1. Go to SES Console → "Account dashboard"
2. Click "Request production access"
3. Fill out the form explaining your use case
4. Wait for approval (usually 24-48 hours)

## Step 4: Verify Region

Make sure SES and your Lambda function are in the same region:

1. Check your Lambda function region (us-east-1 by default)
2. Go to SES Console
3. Make sure you're viewing the same region (top right corner)
4. Verify the email in that specific region

## Step 5: Check IAM Permissions

The Lambda function needs permission to send emails:

1. Go to IAM Console: https://console.aws.amazon.com/iam/
2. Find the role: `PiedmontDetailersBackend-ContactFunctionServiceRole-*`
3. Verify it has `ses:SendEmail` and `ses:SendRawEmail` permissions

If permissions are missing, the CDK stack should have added them. Redeploy if needed:
```bash
cd backend
npm run deploy
```

## Step 6: Test SES Directly

Test if SES works at all:

1. Go to SES Console → "Verified identities"
2. Click on `business@piedmontdetailers.com`
3. Click "Send test email"
4. Send a test email to yourself
5. If this works, the issue is with the Lambda function
6. If this fails, the issue is with SES configuration

## Step 7: Check Email Filters/Spam

- Check spam/junk folder
- Check email filters
- Check if email provider is blocking AWS emails

## Quick Fix Checklist

- [ ] Email `business@piedmontdetailers.com` is verified in SES
- [ ] SES and Lambda are in the same AWS region
- [ ] Checked CloudWatch logs for specific errors
- [ ] Lambda function has SES permissions
- [ ] Not in sandbox mode (or have production access)
- [ ] Checked spam folder
- [ ] Tested SES directly via console

## Common Solutions

### Solution 1: Verify Email Address
```bash
# Go to SES Console and verify business@piedmontdetailers.com
# This is the #1 cause of email issues
```

### Solution 2: Request Production Access
If in sandbox mode, you can only send to verified emails. Request production access to send to any email.

### Solution 3: Check Region Mismatch
Make sure SES and Lambda are in the same region. If you deployed to us-east-1, verify the email in us-east-1 SES.

### Solution 4: Redeploy Stack
If permissions are missing:
```bash
cd backend
npm run deploy
```

## Still Not Working?

1. Check CloudWatch logs for the exact error
2. Verify email in SES Console
3. Test SES directly via console
4. Check IAM permissions
5. Verify region matches

The CloudWatch logs will tell you exactly what's wrong!
