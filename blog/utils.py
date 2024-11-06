import logging
import io
import boto3
from django.conf import settings

logger = logging.getLogger(__name__)

def get_s3_client():
    """
    Initialize and return a boto3 S3 client with credentials from settings.
    """
    return boto3.client(
        's3',
        aws_access_key_id=settings.AWS_S3_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_S3_SECRET_ACCESS_KEY
    )

def upload_file_s3(file, s3_file_name):
    """
    Upload a file to AWS S3 and return the file's public URL.
   
    """
    s3 = get_s3_client()
    bucket_name = settings.AWS_STORAGE_BUCKET_NAME

    try:
        s3.upload_fileobj(
            file,
            bucket_name,
            s3_file_name,
            ExtraArgs={'ACL': 'public-read'}
        )
        file_url = f"https://{bucket_name}.s3.amazonaws.com/{s3_file_name}"
        print("File URL:", file_url)
        return file_url
    except Exception as e:
        logger.error(f"Failed to upload file to S3: {str(e)}")
        return None