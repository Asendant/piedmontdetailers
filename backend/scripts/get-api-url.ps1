# PowerShell script to get the API Gateway URL from CloudFormation stack
# Usage: .\get-api-url.ps1

$STACK_NAME = "piedmont-detailers-backend"

Write-Host "Fetching API Gateway URL from stack: $STACK_NAME" -ForegroundColor Cyan

$API_URL = aws cloudformation describe-stacks `
  --stack-name $STACK_NAME `
  --query "Stacks[0].Outputs[?OutputKey=='ApiGatewayUrl'].OutputValue" `
  --output text

if ([string]::IsNullOrEmpty($API_URL)) {
    Write-Host "❌ Could not find API Gateway URL. Is the stack deployed?" -ForegroundColor Red
    exit 1
}

Write-Host "✅ API Gateway URL: $API_URL" -ForegroundColor Green
Write-Host ""
Write-Host "Update your api-endpoints.json with this URL" -ForegroundColor Yellow
