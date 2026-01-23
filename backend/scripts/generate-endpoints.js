#!/usr/bin/env node

/**
 * Generate API endpoints JSON file for frontend
 * Reads API Gateway URL from CloudFormation stack and creates api-endpoints.json
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const STACK_NAME = 'PiedmontDetailersBackend';
const OUTPUT_FILE = path.join(__dirname, '../../frontend/public/api-endpoints.json');

console.log('🔍 Fetching API Gateway URL from CloudFormation stack...');

try {
  // Get API Gateway URL from CloudFormation stack
  const apiUrl = execSync(
    `aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='ApiGatewayUrl'].OutputValue" --output text`,
    { encoding: 'utf-8' }
  ).trim();

  if (!apiUrl || apiUrl === 'None') {
    console.error('❌ Could not find API Gateway URL. Is the stack deployed?');
    process.exit(1);
  }

  console.log(`✅ Found API Gateway URL: ${apiUrl}`);

  // Create endpoints object
  const endpoints = {
    baseUrl: apiUrl,
    subscribe: `${apiUrl}/subscribe`,
    contact: `${apiUrl}/contact`,
    gallery: `${apiUrl}/gallery`,
    galleryUploadUrl: `${apiUrl}/gallery/upload-url`
  };

  // Write to file
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(endpoints, null, 2) + '\n',
    'utf8'
  );

  console.log(`✅ Generated api-endpoints.json at: ${OUTPUT_FILE}`);
  console.log('');
  console.log('Endpoints:');
  console.log(JSON.stringify(endpoints, null, 2));

} catch (error) {
  console.error('❌ Error generating endpoints:', error.message);
  console.error('');
  console.error('Make sure:');
  console.error('  1. AWS CLI is installed and configured');
  console.error('  2. The stack is deployed: npm run deploy');
  console.error('  3. You have permissions to read CloudFormation stacks');
  process.exit(1);
}
