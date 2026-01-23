import json
import os
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')
table = dynamodb.Table(os.environ['GALLERY_TABLE_NAME'])
bucket_name = os.environ['GALLERY_BUCKET_NAME']
region = os.environ.get('REGION', 'us-east-1')

def lambda_handler(event, context):
    """
    List all gallery items from DynamoDB.
    Returns items with optimized image URLs (CloudFront-ready).
    """
    try:
        # Scan table for all items
        response = table.scan()
        items = response.get('Items', [])
        
        # Convert DynamoDB items to API format
        gallery_items = []
        for item in items:
            # If imageUrl is an S3 key, convert to full URL
            image_url = item.get('imageUrl', '')
            if image_url and not image_url.startswith('http'):
                # Construct S3 URL (can be replaced with CloudFront URL later)
                image_url = f"https://{bucket_name}.s3.{region}.amazonaws.com/{image_url}"
            
            gallery_items.append({
                'id': item.get('id'),
                'title': item.get('title', ''),
                'packageType': item.get('packageType', ''),
                'imageUrl': image_url,
                'description': item.get('description', ''),
                'createdAt': item.get('createdAt', '')
            })
        
        # Sort by createdAt (newest first)
        gallery_items.sort(key=lambda x: x.get('createdAt', ''), reverse=True)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET,OPTIONS',
                'Cache-Control': 'public, max-age=300'  # Cache for 5 minutes
            },
            'body': json.dumps({
                'items': gallery_items,
                'count': len(gallery_items)
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
                'Access-Control-Allow-Methods': 'GET,OPTIONS'
            },
            'body': json.dumps({
                'error': 'Internal server error'
            })
        }
