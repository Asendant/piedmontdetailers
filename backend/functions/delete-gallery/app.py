import json
import os
import boto3

dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')
table = dynamodb.Table(os.environ['GALLERY_TABLE_NAME'])
bucket_name = os.environ['GALLERY_BUCKET_NAME']

def lambda_handler(event, context):
    """
    Delete a gallery item by ID.
    Removes from DynamoDB and optionally deletes S3 object.
    """
    try:
        # Get item ID from path parameters
        item_id = event.get('pathParameters', {}).get('id')
        
        if not item_id:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'DELETE,OPTIONS'
                },
                'body': json.dumps({
                    'error': 'Missing item ID'
                })
            }
        
        # Get item from DynamoDB to find S3 key
        try:
            response = table.get_item(Key={'id': item_id})
            if 'Item' not in response:
                return {
                    'statusCode': 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'DELETE,OPTIONS'
                    },
                    'body': json.dumps({
                        'error': 'Gallery item not found'
                    })
                }
            
            item = response['Item']
            image_url = item.get('imageUrl', '')
            
            # Delete from S3 if it's an S3 key (not external URL)
            if image_url and not image_url.startswith('http'):
                try:
                    s3.delete_object(Bucket=bucket_name, Key=image_url)
                except Exception as e:
                    print(f"Warning: Could not delete S3 object: {str(e)}")
            
        except Exception as e:
            print(f"Error getting item: {str(e)}")
        
        # Delete from DynamoDB
        table.delete_item(Key={'id': item_id})
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'DELETE,OPTIONS'
            },
            'body': json.dumps({
                'message': 'Gallery item deleted successfully'
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
                'Access-Control-Allow-Methods': 'DELETE,OPTIONS'
            },
            'body': json.dumps({
                'error': 'Internal server error'
            })
        }
