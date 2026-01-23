import json
import os
import boto3
from botocore.exceptions import ClientError

ses = boto3.client('ses', region_name=os.environ.get('REGION', 'us-east-1'))
contact_email = os.environ.get('CONTACT_EMAIL', 'business@piedmontdetailers.com')

def lambda_handler(event, context):
    """
    Send contact form submission to business email via SES.
    """
    try:
        # Parse request body
        body = json.loads(event.get('body', '{}'))
        
        # Extract form fields
        name = body.get('name', '').strip()
        phone = body.get('phone', '').strip()
        vehicle = body.get('vehicle', '').strip()
        service = body.get('service', '').strip()
        location = body.get('location', '').strip()
        notes = body.get('notes', '').strip()
        
        # Validate required fields
        if not all([name, phone, vehicle, service, location]):
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST,OPTIONS'
                },
                'body': json.dumps({
                    'error': 'Missing required fields'
                })
            }
        
        # Format email content
        email_subject = f'New Contact Form Submission from {name}'
        email_body_text = f'''New Contact Form Submission

Name: {name}
Phone: {phone}
Vehicle: {vehicle}
Service: {service}
Location: {location}
Notes: {notes if notes else 'N/A'}

---
This message was sent from the Piedmont Detailers contact form.'''
        
        email_body_html = f'''<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Name:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{name}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="tel:{phone}">{phone}</a></td>
            </tr>
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Vehicle:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{vehicle}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Service:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{service}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Location:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{location}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Notes:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{notes if notes else 'N/A'}</td>
            </tr>
        </table>
        <p style="margin-top: 20px; color: #666; font-size: 12px;">
            This message was sent from the Piedmont Detailers contact form.
        </p>
    </div>
</body>
</html>'''
        
        # Send email via SES
        ses.send_email(
            Source=contact_email,
            Destination={'ToAddresses': [contact_email]},
            ReplyToAddresses=[],  # Could add a reply-to if needed
            Message={
                'Subject': {'Data': email_subject, 'Charset': 'UTF-8'},
                'Body': {
                    'Text': {'Data': email_body_text, 'Charset': 'UTF-8'},
                    'Html': {'Data': email_body_html, 'Charset': 'UTF-8'}
                }
            }
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
                'message': 'Contact form submitted successfully'
            })
        }
        
    except ClientError as e:
        error_code = e.response.get('Error', {}).get('Code', 'Unknown')
        error_message = e.response.get('Error', {}).get('Message', str(e))
        print(f"SES Error: {error_code} - {error_message}")
        print(f"Full error: {str(e)}")
        
        # Provide more helpful error messages
        if error_code == 'MessageRejected':
            error_msg = 'Email address not verified in SES. Please verify business@piedmontdetailers.com in AWS SES Console.'
        elif error_code == 'MailFromDomainNotVerifiedException':
            error_msg = 'Sender email domain not verified in SES.'
        else:
            error_msg = f'Failed to send email: {error_message}'
        
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            'body': json.dumps({
                'error': error_msg,
                'errorCode': error_code
            })
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        print(traceback.format_exc())
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            'body': json.dumps({
                'error': f'Internal server error: {str(e)}'
            })
        }
