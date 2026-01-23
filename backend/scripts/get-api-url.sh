#!/bin/bash

# Script to get the API Gateway URL from CloudFormation stack
# Usage: ./get-api-url.sh

STACK_NAME="piedmont-detailers-backend"

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
echo ""
echo "Update your api-endpoints.json with this URL"
