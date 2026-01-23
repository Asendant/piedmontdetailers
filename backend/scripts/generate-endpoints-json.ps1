# PowerShell script to generate api-endpoints.json from CloudFormation stack
# Usage: .\generate-endpoints-json.ps1

$STACK_NAME = "piedmont-detailers-backend"
$OUTPUT_FILE = "../../frontend/public/api-endpoints.json"

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

# Create endpoints JSON
$endpoints = @{
    baseUrl = $API_URL
    subscribe = "$API_URL/subscribe"
    contact = "$API_URL/contact"
    gallery = "$API_URL/gallery"
    galleryUploadUrl = "$API_URL/gallery/upload-url"
} | ConvertTo-Json -Depth 10

# Write to file
$endpoints | Out-File -FilePath $OUTPUT_FILE -Encoding utf8

Write-Host "✅ Generated api-endpoints.json at: $OUTPUT_FILE" -ForegroundColor Green
Write-Host ""
Write-Host "Endpoints:" -ForegroundColor Yellow
$endpoints | ConvertFrom-Json | ConvertTo-Json
