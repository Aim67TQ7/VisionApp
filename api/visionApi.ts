// visionApi.ts
import axios from 'axios';
import { loadPrompt } from './utils/promptLoader';
import { processPayment } from './utils/stripeService';
import { uploadReportToS3 } from './utils/awsService';

const API_ENDPOINT = 'https://api.anthropic.com/vision'; // Replace with the actual endpoint of the Anthropics vision API
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key

interface ImageData {
  url: string;
}

export const analyzeImages = async (imageUrls: string[]) => {
  try {
    const prompt = await loadPrompt(); // Load prompt dynamically from the promptLoader utility
    const payload = {
      images: imageUrls,
      prompt: prompt,
    };

    const response = await axios.post(API_ENDPOINT, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error analyzing images:', error);
    throw error;
  }
};

export const generateFullReport = async (imageUrls: string[], paymentToken: string) => {
  try {
    // Process payment using Stripe
    const paymentResult = await processPayment(paymentToken, 3.99);
    if (!paymentResult.success) {
      throw new Error('Payment failed. Unable to generate the full report.');
    }

    // Re-run the analysis to generate full report
    const fullReport = await analyzeImages(imageUrls);

    // Upload full report to S3
    const s3UploadResult = await uploadReportToS3(fullReport);
    console.log('Full report successfully uploaded to S3:', s3UploadResult);

    return fullReport;
  } catch (error) {
    console.error('Error generating full report:', error);
    throw error;
  }
};

// Stripe Payment Integration and Full Report Generation
// The `generateFullReport` function handles the payment process, re-analyzes images for the full report, and uploads the report to AWS S3.
// A dedicated Stripe utility (`stripeService.ts`) handles payments and AWS utility (`awsService.ts`) manages S3 operations.
