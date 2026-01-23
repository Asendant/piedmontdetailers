# Troubleshooting Email Delivery Issues

## Problem: Test emails from SES Console don't arrive

If emails sent from the SES console don't arrive, this is a delivery/configuration issue, not a code issue.

## Step 1: Check Spam/Junk Folder

**This is the #1 reason emails don't arrive!**

- Check your spam/junk folder
- Check any email filters
- Some email providers (Gmail, Outlook) are very aggressive with spam filtering

## Step 2: Check Email Provider Settings

Some email providers block AWS SES emails by default:

### Gmail
- Check "Spam" folder
- Check "All Mail" folder
- Gmail may delay AWS emails or mark them as spam
- Try adding AWS SES to your contacts

### Outlook/Hotmail
- Check "Junk Email" folder
- Check "Quarantine" in Outlook Security settings
- Outlook is known to be strict with AWS emails

### Yahoo
- Check "Spam" folder
- Check "Bulk" folder

### Corporate Email
- Corporate email servers often block AWS SES
- Check with IT department
- May need to whitelist AWS SES IPs

## Step 3: Verify Email Address Status

1. Go to SES Console: https://console.aws.amazon.com/ses/
2. Click "Verified identities"
3. Find `business@piedmontdetailers.com`
4. Check the status - should show "Verified" with a green checkmark
5. If it shows "Pending", check your email for the verification link

## Step 4: Check SES Bounce/Complaint Rates

1. Go to SES Console → "Account dashboard"
2. Check "Reputation metrics"
3. Look for:
   - **Bounce rate** - should be < 5%
   - **Complaint rate** - should be < 0.1%
4. If rates are high, your account might be restricted

## Step 5: Check SES Account Status

1. Go to SES Console → "Account dashboard"
2. Check "Account status"
3. Look for any warnings or restrictions
4. If account is "Sending paused", you need to request it be enabled

## Step 6: Test with Different Email Provider

Try sending a test email to a different email provider:

1. Use a Gmail account (if you're using Outlook)
2. Use an Outlook account (if you're using Gmail)
3. Use a different email service entirely

This will help determine if it's provider-specific.

## Step 7: Check DNS Records (If Using Domain)

If you verified a domain instead of just an email:

1. Go to SES Console → "Verified identities"
2. Click on your domain
3. Check DNS records:
   - **SPF record** - should be present
   - **DKIM records** - should be present (3 records)
   - **DMARC record** - recommended but not required

Missing DNS records can cause delivery issues.

## Step 8: Check CloudWatch Metrics

1. Go to CloudWatch Console: https://console.aws.amazon.com/cloudwatch/
2. Click "Metrics" → "SES"
3. Check:
   - **Send** - number of emails sent
   - **Bounce** - number of bounces
   - **Complaint** - number of complaints
   - **Delivery** - number of successful deliveries

If you see bounces or complaints, that's the issue.

## Step 9: Check Email Provider Logs

Some email providers show why emails were blocked:

- **Gmail**: Check "Security" settings for blocked senders
- **Outlook**: Check "Junk Email" settings
- **Corporate**: Check with IT for email server logs

## Step 10: Use SES Email Simulator

AWS provides an email simulator for testing:

1. Go to SES Console → "Email receiving"
2. Use the SES email simulator addresses:
   - `success@simulator.amazonses.com` - always succeeds
   - `bounce@simulator.amazonses.com` - always bounces
   - `complaint@simulator.amazonses.com` - always complains

Send a test email to `success@simulator.amazonses.com` to verify SES is working.

## Common Solutions

### Solution 1: Check Spam Folder
**Most common issue** - Emails are arriving but going to spam.

### Solution 2: Whitelist AWS SES
Add AWS SES to your email provider's whitelist/approved senders list.

### Solution 3: Use Different Email Provider
If your current provider blocks AWS emails, try:
- Gmail (usually works well)
- Outlook.com
- Yahoo Mail
- ProtonMail

### Solution 4: Set Up Domain Verification
Instead of just verifying an email, verify the entire domain:
1. Go to SES Console → "Verified identities"
2. Click "Create identity" → "Domain"
3. Enter your domain: `piedmontdetailers.com`
4. Add the DNS records to your domain
5. This improves deliverability

### Solution 5: Request Production Access
If in sandbox mode:
1. Go to SES Console → "Account dashboard"
2. Click "Request production access"
3. Fill out the form
4. Wait for approval

## Quick Diagnostic Commands

```bash
# Check verified emails
aws ses list-verified-email-addresses --region us-east-1

# Check sending quota
aws ses get-send-quota --region us-east-1

# Check account sending status
aws ses get-account-sending-enabled --region us-east-1

# Get sending statistics
aws ses get-send-statistics --region us-east-1
```

## Still Not Working?

1. **Try a different email address** - Use a Gmail account to test
2. **Check spam folder** - This is the #1 issue
3. **Check email provider settings** - Some block AWS by default
4. **Verify domain instead of email** - Better deliverability
5. **Contact AWS Support** - If nothing else works

## Alternative: Use a Different Email Service

If SES continues to have delivery issues, consider:
- **SendGrid** - Better deliverability, free tier
- **Mailgun** - Good deliverability, free tier
- **Postmark** - Excellent deliverability, paid
- **AWS WorkMail** - If you need a full email solution
