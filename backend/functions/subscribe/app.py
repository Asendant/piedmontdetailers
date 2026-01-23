import json
import os
import boto3
from datetime import datetime
from botocore.exceptions import ClientError
import re

dynamodb = boto3.resource('dynamodb')
ses = boto3.client('ses', region_name=os.environ.get('REGION', 'us-east-1'))
table = dynamodb.Table(os.environ['SUBSCRIPTIONS_TABLE_NAME'])

def lambda_handler(event, context):
    """
    Subscribe an email to the notification list.
    Stores email in DynamoDB and sends confirmation email via SES.
    """
    try:
        # Parse request body
        body = json.loads(event.get('body', '{}'))
        email = body.get('email', '').strip().lower()
        
        # Validate email
        if not email or not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                'body': json.dumps({
                    'error': 'Invalid email address'
                })
            }
        
        # Check if email already exists
        try:
            response = table.get_item(Key={'email': email})
            if 'Item' in response:
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'POST,OPTIONS'
                    },
                    'body': json.dumps({
                        'message': 'Email already subscribed',
                        'subscribed': True
                    })
                }
        except ClientError as e:
            # If table doesn't exist or other error, continue
            pass
        
        # Add email to DynamoDB
        table.put_item(
            Item={
                'email': email,
                'subscribedAt': datetime.utcnow().isoformat(),
                'status': 'active'
            }
        )
        
        # Send confirmation email via SES
        try:
            ses.send_email(
                Source='business@piedmontdetailers.com',
                Destination={'ToAddresses': [email]},
                Message={
                    'Subject': {'Data': 'Welcome to Piedmont Detailers!', 'Charset': 'UTF-8'},
                    'Body': {
                        'Text': {
                            'Data': f'''Thank you for subscribing to Piedmont Detailers!

We're launching in September 2026, and you'll be the first to know when booking opens. You'll also receive early access to special offers and updates.

We look forward to serving you!

Best regards,
The Piedmont Detailers Team''',
                            'Charset': 'UTF-8'
                        },
                        'Html': {
                            'Data': f'''<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #3b82f6;">Thank you for subscribing!</h2>
        <p>Thank you for subscribing to Piedmont Detailers!</p>
        <p>We're launching in September 2026, and you'll be the first to know when booking opens. You'll also receive early access to special offers and updates.</p>
        <p>We look forward to serving you!</p>
        <p>Best regards,<br>The Piedmont Detailers Team</p>
    </div>
</body>
</html>''',
                            'Charset': 'UTF-8'
                        }
                    }
                }
            )
        except ClientError as e:
            # Log error but don't fail the subscription
            print(f"Error sending email: {str(e)}")
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            'body': json.dumps({
                'message': 'Successfully subscribed',
                'subscribed': True
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
