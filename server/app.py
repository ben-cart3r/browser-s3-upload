import os
import logging
import boto3
from flask import Flask, send_from_directory
from botocore.exceptions import ClientError

app = Flask(__name__)

bucket_name = os.environ["bucket_name"]

def create_presigned_post(bucket_name, object_name, expiration=3600):
    s3_client = boto3.client("s3")
    
    try:
        response = s3_client.generate_presigned_post(bucket_name, object_name, ExpiresIn=expiration)
    except ClientError as e:
        logging.error(e)
        return None

    return response

# API Routes
@app.route("/api/upload_url/<object_name>")
def create_upload_url(object_name):
    response = create_presigned_post(bucket_name, object_name)

    # CORS fix (https://github.com/boto/boto3/issues/421)
    # S3 global url doesn't resolve initially so it redirects to a regional url 
    # and doesn't pass the origin header so CORS fails
    # So we just use the regional specific domain by default
    response["url"] = f"https://{bucket_name}.s3.eu-west-1.amazonaws.com/"

    return response

# Static assets
@app.route("/", defaults={'path': ''})
@app.route("/<path:path>")
def catch_all(path):
	if path in ["bundle.js"]:
		return send_from_directory("../client/dist", path)

	return send_from_directory("../client/dist", "index.html")