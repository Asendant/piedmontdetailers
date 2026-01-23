import json
import os
import boto3
import uuid

s3 = boto3.client('s3')
bucket_name = os.environ['GALLERY_BUCKET_NAME']

def lambda_handler(event, context):
    """
    Generate a presigned URL for uploading images directly to S3.
    This allows frontend to upload images without going through Lambda.
    """
    try:
        # Parse request body
        body = json.loads(event.get('body', '{}'))
        file_name = body.get('fileName', '')
        content_type = body.get('contentType', 'image/jpeg')
        
        # Generate unique S3 key
        file_extension = file_name.split('.')[-1] if '.' in file_name else 'jpg'
        s3_key = f"gallery/{uuid.uuid4()}.{file_extension}"
        
        # Generate presigned URL (valid for 5 minutes)
        presigned_url = s3.generate_presigned_url(
            'put_object',
            Params={
                'Bucket': bucket_name,
                'Key': s3_key,
                'ContentType': content_type
            },
            ExpiresIn=300  # 5 minutes
        )
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            'body': json.dumps({
                'uploadUrl': presigned_url,
                'key': s3_key,
                'imageUrl': f"https://{bucket_name}.s3.{os.environ.get('REGION', 'us-east-1')}.amazonaws.com/{s3_key}"
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
