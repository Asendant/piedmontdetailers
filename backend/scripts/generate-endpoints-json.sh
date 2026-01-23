#!/bin/bash

# Script to generate api-endpoints.json from CloudFormation stack
# Usage: ./generate-endpoints-json.sh

STACK_NAME="piedmont-detailers-backend"
OUTPUT_FILE="../../frontend/public/api-endpoints.json"

echo "Fetching API Gateway URL from stack: $STACK_NAME"

API_URL=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --query "Stacks[0].Outputs[?OutputKey=='ApiGatewayUrl'].OutputValue" \
  --output text)

if [ -z "$API_URL" ]; then
    echo "❌ Could not find API Gateway URL. Is the stack deployed?"
    exit 1
fi

echo "✅ API Gateway URL: $API_URL"

# Create endpoints JSON
cat > "$OUTPUT_FILE" << EOF
{
  "baseUrl": "$API_URL",
  "subscribe": "$API_URL/subscribe",
  "contact": "$API_URL/contact",
  "gallery": "$API_URL/gallery",
  "galleryUploadUrl": "$API_URL/gallery/upload-url"
}
EOF

echo "✅ Generated api-endpoints.json at: $OUTPUT_FILE"
echo ""
echo "Endpoints:"
cat "$OUTPUT_FILE"
