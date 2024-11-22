// AppPage.tsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UploadForm from '../components/UploadForm';
import { analyzeImages } from '../api/visionApi';
import { uploadImageToS3 } from '../utils/awsService';
import { processPayment } from '../utils/stripeService';
import ReportViewer from '../components/ReportViewer';

const AppPage: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [reportData, setReportData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState<boolean>(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      if (selectedFiles.length + images.length > 4) {
        setError('You can only upload up to 4 images.');
        return;
      }
      setImages([...images, ...selectedFiles]);
      setError(null);
    }
  };

  const handleUploadImages = async () => {
    setUploading(true);
    try {
      const uploadResults = await Promise.all(images.map((image) => uploadImageToS3(image)));
      const successfulUploads = uploadResults.filter(result => result.success);
      const urls = successfulUploads.map(result => result.url || '');
      setImageUrls(urls);
      setError(null);
    } catch (err) {
      console.error('Error uploading images:', err);
      setError('Error uploading images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyzeImages = async () => {
    if (imageUrls.length === 0) {
      setError('No images uploaded. Please upload images first.');
      return;
    }
    try {
      const analysisData = await analyzeImages(imageUrls);
      setReportData(analysisData);
      setError(null);
    } catch (err) {
      console.error('Error analyzing images:', err);
      setError('Error analyzing images. Please try again.');
    }
  };

  const handlePurchaseFullReport = async () => {
    const paymentToken = 'sample_payment_token'; // This should be replaced with actual token from Stripe checkout
    try {
      const paymentResult = await processPayment(paymentToken, 3.99);
      if (paymentResult.success) {
        setPaymentSuccessful(true);
        // Generate full report after successful payment
        handleAnalyzeImages();
      } else {
        setError(paymentResult.message);
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      setError('Payment processing failed. Please try again.');
    }
  };

  return (
    <div className="app-page">
      {/* Header Component */}
      <Header />

      {/* Main Application Section */}
      <main>
        <h2>Upload Your Photos</h2>
        <p>Upload up to 4 photos for evaluation and receive an AI-powered report with recommendations for improvement.</p>
        <UploadForm />
        <button onClick={handleUploadImages} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Images'}
        </button>
        {imageUrls.length > 0 && (
          <button onClick={handleAnalyzeImages}>Analyze Images</button>
        )}
        {reportData && !paymentSuccessful && (
          <div>
            <ReportViewer reportData={reportData} />
            <button onClick={handlePurchaseFullReport}>Purchase Full Report for $3.99</button>
          </div>
        )}
        {paymentSuccessful && reportData && (
          <div>
            <h3>Full Report</h3>
            <ReportViewer reportData={reportData} />
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default AppPage;

// Description:
// This file is the main app page where users can upload images, analyze them, and optionally purchase the full report.
// Users can upload up to 4 images, which are then stored in AWS S3 via `awsService.ts`.
// After uploading, users can choose to analyze images, and if satisfied, purchase the full report through Stripe.
// Payment success enables full access to the comprehensive AI-generated report.
