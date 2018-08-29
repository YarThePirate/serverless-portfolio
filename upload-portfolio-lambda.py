import boto3
from io import BytesIO
import zipfile
import mimetypes

BUILD_BUCKET_NAME = 'portfoliobuild.bigdumblump.com'
PORTFOLIO_BUCKET_NAME = 'portfolio.bigdumblump.com'
BUILD_FILE_ZIP = 'portfoliobuild.zip'

s3 = boto3.resource('s3')

build_bucket = s3.Bucket(BUILD_BUCKET_NAME)
portfolio_bucket = s3.Bucket(PORTFOLIO_BUCKET_NAME)

portfolio_zip = BytesIO()

build_bucket.download_fileobj(BUILD_FILE_ZIP, portfolio_zip)

with zipfile.ZipFile(portfolio_zip) as build_zip:
    for fname in build_zip.namelist():
        obj = build_zip.open(fname)
        portfolio_bucket.upload_fileobj(obj, fname, 
            ExtraArgs={'ContentType': mimetypes.guess_type(fname)[0]})
        portfolio_bucket.Object(fname).Acl().put(ACL='public-read')