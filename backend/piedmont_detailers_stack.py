"""
AWS CDK Stack for Piedmont Detailers Backend
"""

from aws_cdk import (
    Stack,
    Duration,
    aws_dynamodb as dynamodb,
    aws_s3 as s3,
    aws_lambda as lambda_,
    aws_apigateway as apigateway,
    aws_iam as iam,
    CfnOutput,
    RemovalPolicy,
)
from constructs import Construct
import os


class PiedmontDetailersStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # DynamoDB Tables
        gallery_table = dynamodb.Table(
            self,
            "GalleryTable",
            table_name="piedmont-detailers-gallery",
            partition_key=dynamodb.Attribute(
                name="id", type=dynamodb.AttributeType.STRING
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            removal_policy=RemovalPolicy.RETAIN,
        )

        subscriptions_table = dynamodb.Table(
            self,
            "SubscriptionsTable",
            table_name="piedmont-detailers-subscriptions",
            partition_key=dynamodb.Attribute(
                name="email", type=dynamodb.AttributeType.STRING
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            removal_policy=RemovalPolicy.RETAIN,
        )

        # S3 Bucket for Gallery Images
        gallery_bucket = s3.Bucket(
            self,
            "GalleryBucket",
            bucket_name=f"piedmont-detailers-gallery-{self.account}",
            public_read_access=True,
            block_public_access=s3.BlockPublicAccess(
                block_public_acls=False,
                block_public_policy=False,
                ignore_public_acls=False,
                restrict_public_buckets=False,
            ),
            removal_policy=RemovalPolicy.RETAIN,
            cors=[
                s3.CorsRule(
                    allowed_headers=["*"],
                    allowed_methods=[s3.HttpMethods.GET, s3.HttpMethods.PUT, s3.HttpMethods.POST, s3.HttpMethods.HEAD],
                    allowed_origins=["*"],
                    max_age=3000,
                )
            ],
            lifecycle_rules=[
                s3.LifecycleRule(
                    id="DeleteOldVersions",
                    noncurrent_version_expiration=Duration.days(30),
                    enabled=True,
                )
            ],
        )

        # Common Lambda environment variables
        common_env = {
            "GALLERY_TABLE_NAME": gallery_table.table_name,
            "SUBSCRIPTIONS_TABLE_NAME": subscriptions_table.table_name,
            "GALLERY_BUCKET_NAME": gallery_bucket.bucket_name,
            "CONTACT_EMAIL": "business@piedmontdetailers.com",
            "REGION": self.region,
        }

        # Lambda function for email subscription
        subscribe_function = lambda_.Function(
            self,
            "SubscribeFunction",
            function_name="piedmont-detailers-subscribe",
            runtime=lambda_.Runtime.PYTHON_3_11,
            handler="app.lambda_handler",
            code=lambda_.Code.from_asset("functions/subscribe"),
            timeout=Duration.seconds(30),
            memory_size=256,
            environment=common_env,
        )

        # Grant permissions
        subscriptions_table.grant_read_write_data(subscribe_function)
        subscribe_function.add_to_role_policy(
            iam.PolicyStatement(
                effect=iam.Effect.ALLOW,
                actions=["ses:SendEmail", "ses:SendRawEmail"],
                resources=["*"],
            )
        )

        # Lambda function for contact form
        contact_function = lambda_.Function(
            self,
            "ContactFunction",
            function_name="piedmont-detailers-contact",
            runtime=lambda_.Runtime.PYTHON_3_11,
            handler="app.lambda_handler",
            code=lambda_.Code.from_asset("functions/contact"),
            timeout=Duration.seconds(30),
            memory_size=256,
            environment=common_env,
        )

        contact_function.add_to_role_policy(
            iam.PolicyStatement(
                effect=iam.Effect.ALLOW,
                actions=["ses:SendEmail", "ses:SendRawEmail"],
                resources=["*"],
            )
        )

        # Lambda function for listing gallery
        list_gallery_function = lambda_.Function(
            self,
            "ListGalleryFunction",
            function_name="piedmont-detailers-list-gallery",
            runtime=lambda_.Runtime.PYTHON_3_11,
            handler="app.lambda_handler",
            code=lambda_.Code.from_asset("functions/list-gallery"),
            timeout=Duration.seconds(30),
            memory_size=256,
            environment=common_env,
        )

        gallery_table.grant_read_data(list_gallery_function)
        gallery_bucket.grant_read(list_gallery_function)

        # Lambda function for uploading gallery items
        upload_gallery_function = lambda_.Function(
            self,
            "UploadGalleryFunction",
            function_name="piedmont-detailers-upload-gallery",
            runtime=lambda_.Runtime.PYTHON_3_11,
            handler="app.lambda_handler",
            code=lambda_.Code.from_asset("functions/upload-gallery"),
            timeout=Duration.seconds(60),
            memory_size=256,
            environment=common_env,
        )

        gallery_table.grant_read_write_data(upload_gallery_function)
        gallery_bucket.grant_read_write(upload_gallery_function)

        # Lambda function for deleting gallery items
        delete_gallery_function = lambda_.Function(
            self,
            "DeleteGalleryFunction",
            function_name="piedmont-detailers-delete-gallery",
            runtime=lambda_.Runtime.PYTHON_3_11,
            handler="app.lambda_handler",
            code=lambda_.Code.from_asset("functions/delete-gallery"),
            timeout=Duration.seconds(30),
            memory_size=256,
            environment=common_env,
        )

        gallery_table.grant_read_write_data(delete_gallery_function)
        gallery_bucket.grant_delete(delete_gallery_function)

        # Lambda function for getting presigned URLs
        presigned_url_function = lambda_.Function(
            self,
            "PresignedUrlFunction",
            function_name="piedmont-detailers-presigned-url",
            runtime=lambda_.Runtime.PYTHON_3_11,
            handler="app.lambda_handler",
            code=lambda_.Code.from_asset("functions/get-presigned-url"),
            timeout=Duration.seconds(30),
            memory_size=256,
            environment=common_env,
        )

        gallery_bucket.grant_write(presigned_url_function)

        # API Gateway
        api = apigateway.RestApi(
            self,
            "ApiGateway",
            rest_api_name="piedmont-detailers-api",
            description="API for Piedmont Detailers backend",
            default_cors_preflight_options=apigateway.CorsOptions(
                allow_origins=["*"],
                allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                allow_headers=["Content-Type", "X-Amz-Date", "Authorization", "X-Api-Key", "X-Amz-Security-Token"],
                max_age=Duration.minutes(10),
            ),
            deploy_options=apigateway.StageOptions(
                stage_name="prod",
            ),
        )

        # API Routes
        subscribe_resource = api.root.add_resource("subscribe")
        subscribe_resource.add_method(
            "POST",
            apigateway.LambdaIntegration(subscribe_function),
        )

        contact_resource = api.root.add_resource("contact")
        contact_resource.add_method(
            "POST",
            apigateway.LambdaIntegration(contact_function),
        )

        gallery_resource = api.root.add_resource("gallery")
        gallery_resource.add_method(
            "GET",
            apigateway.LambdaIntegration(list_gallery_function),
        )
        gallery_resource.add_method(
            "POST",
            apigateway.LambdaIntegration(upload_gallery_function),
        )

        gallery_item_resource = gallery_resource.add_resource("{id}")
        gallery_item_resource.add_method(
            "DELETE",
            apigateway.LambdaIntegration(delete_gallery_function),
        )

        upload_url_resource = gallery_resource.add_resource("upload-url")
        upload_url_resource.add_method(
            "POST",
            apigateway.LambdaIntegration(presigned_url_function),
        )

        # Outputs
        CfnOutput(
            self,
            "ApiGatewayUrl",
            value=api.url,
            description="API Gateway endpoint URL",
            export_name="PiedmontDetailersApiUrl",
        )

        CfnOutput(
            self,
            "GalleryBucketName",
            value=gallery_bucket.bucket_name,
            description="S3 Bucket for gallery images",
            export_name="PiedmontDetailersGalleryBucket",
        )
