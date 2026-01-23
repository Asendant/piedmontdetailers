# PowerShell script to check SES status

Write-Host "Checking SES Configuration..." -ForegroundColor Cyan
Write-Host ""

# Check if email is verified
Write-Host "Checking verified identities in SES..." -ForegroundColor Yellow
aws ses list-verified-email-addresses --region us-east-1

Write-Host ""
Write-Host "To verify the email:" -ForegroundColor Green
Write-Host "1. Go to: https://console.aws.amazon.com/ses/" -ForegroundColor Cyan
Write-Host "2. Click 'Verified identities'" -ForegroundColor Cyan
Write-Host "3. Click 'Create identity'" -ForegroundColor Cyan
Write-Host "4. Enter: business@piedmontdetailers.com" -ForegroundColor Cyan
Write-Host "5. Check your email and click the verification link" -ForegroundColor Cyan
Write-Host ""

# Check SES sending status
Write-Host "Checking SES account sending status..." -ForegroundColor Yellow
aws ses get-account-sending-enabled --region us-east-1 2>&1

Write-Host ""
Write-Host "To check CloudWatch logs for errors:" -ForegroundColor Green
Write-Host "aws logs tail /aws/lambda/piedmont-detailers-contact --follow" -ForegroundColor Cyan
