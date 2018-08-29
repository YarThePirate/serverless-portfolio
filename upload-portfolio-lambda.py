import boto3
import os
from io import BytesIO
import zipfile
import mimetypes

def lambda_handler(event, context):
    sns = boto3.resource('sns')
    topic = sns.Topic(os.environ['SNS_TOPIC_ARN'])
    
    try:
        job = event.get("CodePipeline.job")
        
        #default, for running outside of CodePipeline
        location = {
            "bucketName": os.environ['BUILD_BUCKET_NAME'],
            "objectKey": os.environ['BUILD_FILE_ZIP']
        }
        
        if job:
            for artifact in job['data']['inputArtifacts']:
                if artifact['name'] == "MyAppBuild":
                    location = artifact["location"]["s3Location"]
        print(f'Building portfolio from {str(location)}')
        s3 = boto3.resource('s3')

        build_bucket = s3.Bucket(location["bucketName"])
        portfolio_bucket = s3.Bucket(os.environ['PORTFOLIO_BUCKET_NAME'])
        
        portfolio_zip = BytesIO()
        
        build_bucket.download_fileobj(location["objectKey"], portfolio_zip)
        
        with zipfile.ZipFile(portfolio_zip) as build_zip:
            for fname in build_zip.namelist():
                obj = build_zip.open(fname)
                portfolio_bucket.upload_fileobj(obj, fname, 
                    ExtraArgs={'ContentType': mimetypes.guess_type(fname)[0]})
                portfolio_bucket.Object(fname).Acl().put(ACL='public-read')
        
        print("Job done!")
        topic.publish(Subject="Portfolio Deployed", Message="A new build of the portfolio has been deployed!")
        if job:
            codepipeline = boto3.client('codepipeline')
            codepipeline.put_job_success_result(jobId=job['id'])
        
    except:
        topic.publish(Subject="Portfolio Deploy Failed", Message="The portfolio was not deployed successfully!")
        raise
    
    return "Hello frum Big Dum Lump"