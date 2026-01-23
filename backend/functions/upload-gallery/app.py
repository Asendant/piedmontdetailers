import json
import os
import boto3
import uuid
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')
table = dynamodb.Table(os.environ['GALLERY_TABLE_NAME'])
bucket_name = os.environ['GALLERY_BUCKET_NAME']

def lambda_handler(event, context):
    """
    Upload a gallery item.
    Expects imageUrl to be an S3 key or full URL.
    Creates DynamoDB entry with metadata.
    """
    try:
        # Parse request body
        body = json.loads(event.get('body', '{}'))
        
        # Extract fields
        title = body.get('title', '').strip()
        package_type = body.get('packageType', '').strip()
        image_url = body.get('imageUrl', '').strip()
        description = body.get('description', '').strip()
        
        # Validate required fields
        if not all([title, package_type, image_url]):
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                'body': json.dumps({
                    'error': 'Missing required fields: title, packageType, imageUrl'
                })
            }
        
        # Validate package type
        valid_packages = ['Interior Package', 'Exterior Package', 'Full Wash Package']
        if package_type not in valid_packages:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                'body': json.dumps({
                    'error': f'Invalid packageType. Must be one of: {", ".join(valid_packages)}'
                })
            }
        
        # Generate ID
        item_id = str(uuid.uuid4())
        
        # If imageUrl is a full URL, extract the key or use as-is
        # If it's already an S3 key, use it directly
        s3_key = image_url
        if image_url.startswith('http'):
            # Extract key from URL if it's an S3 URL
            if f's3.{os.environ.get("REGION", "us-east-1")}.amazonaws.com' in image_url:
                s3_key = image_url.split(f'{bucket_name}/')[-1] if f'{bucket_name}/' in image_url else image_url
            else:
                # External URL, store as-is
                s3_key = image_url
        
        # Store in DynamoDB
        table.put_item(
            Item={
                'id': item_id,
                'title': title,
                'packageType': package_type,
                'imageUrl': s3_key,  # Store S3 key or full URL
                'description': description,
                'createdAt': datetime.utcnow().isoformat()
            }
        )
        
        # Construct full image URL for response
        if not s3_key.startswith('http'):
            full_image_url = f"https://{bucket_name}.s3.{os.environ.get('REGION', 'us-east-1')}.amazonaws.com/{s3_key}"
        else:
            full_image_url = s3_key
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            'body': json.dumps({
                'message': 'Gallery item created successfully',
                'item': {
                    'id': item_id,
                    'title': title,
                    'packageType': package_type,
                    'imageUrl': full_image_url,
                    'description': description
                }
            })
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            'body': json.dumps({
                'error': 'Internal server error'
            })
        }
