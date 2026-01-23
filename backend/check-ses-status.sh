#!/bin/bash
# Quick script to check SES status and verify email

echo "Checking SES Configuration..."
echo ""

# Check if email is verified
echo "Checking verified identities in SES..."
aws ses list-verified-email-addresses --region us-east-1

echo ""
echo "To verify the email:"
echo "1. Go to: https://console.aws.amazon.com/ses/"
echo "2. Click 'Verified identities'"
echo "3. Click 'Create identity'"
echo "4. Enter: business@piedmontdetailers.com"
echo "5. Check your email and click the verification link"
echo ""

# Check SES sending status
echo "Checking SES account sending status..."
aws ses get-account-sending-enabled --region us-east-1 2>&1 || echo "Could not check sending status"

echo ""
echo "To check CloudWatch logs for errors:"
echo "aws logs tail /aws/lambda/piedmont-detailers-contact --follow"
