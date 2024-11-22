// awsService.ts
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Configure AWS S3
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  region: process.env.AWS_REGION || 'us-east-1',
});

const s3 = new AWS.S3();

interface S3UploadResult {
  success: boolean;
  message: string;
  url?: string;
}

export const uploadImageToS3 = async (file: File, folder: string = 'uploads'): Promise<S3UploadResult> => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME || 'CurbAppeal',
      Key: `${folder}/${Date.now()}_${file.name}`,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read',
    };

    const data = await s3.upload(params).promise();
    return { success: true, message: 'File uploaded successfully.', url: data.Location };
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    return { success: false, message: 'Error uploading file to S3.' };
  }
};

export const uploadReportToS3 = async (reportData: any, reportName: string = 'full_report.pdf'): Promise<S3UploadResult> => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME || 'CurbAppeal',
      Key: `reports/${Date.now()}_${reportName}`,
      Body: reportData,
      ContentType: 'application/pdf',
      ACL: 'private',
    };

    const data = await s3.upload(params).promise();
    return { success: true, message: 'Report uploaded successfully.', url: data.Location };
  } catch (error) {
    console.error('Error uploading report to S3:', error);
    return { success: false, message: 'Error uploading report to S3.' };
  }
};

// Description:
// This file provides utility functions for interacting with AWS S3, including uploading images and reports.
// The `uploadImageToS3` function uploads user images to the S3 bucket, making them publicly accessible.
// The `uploadReportToS3` function uploads generated PDF reports to the S3 bucket with restricted access.
// Both functions use the `dotenv` package to load AWS credentials from a `.env` file, ensuring security.
// Proper error handling is implemented to provide meaningful messages in case of failures.
