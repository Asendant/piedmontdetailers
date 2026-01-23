#!/usr/bin/env python3
"""
AWS CDK App for Piedmont Detailers Backend
"""

import aws_cdk as cdk
from piedmont_detailers_stack import PiedmontDetailersStack

app = cdk.App()
PiedmontDetailersStack(
    app,
    "PiedmontDetailersBackend",
    env=cdk.Environment(
        account=app.node.try_get_context("account"),
        region=app.node.try_get_context("region") or "us-east-1",
    ),
    description="Serverless backend API for Piedmont Detailers",
)

app.synth()
