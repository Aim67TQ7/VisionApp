import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UploadForm from '../components/UploadForm';

const AppPage: React.FC = () => {
  return (
    <div className="app-page">
      {/* Header Component */}
      <Header />

      {/* Main Application Section */}
      <main>
        <h2>Upload Your Photos</h2>
        <p>Upload up to 4 photos for evaluation and receive an AI-powered report with recommendations for improvement.</p>
        <UploadForm />
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default AppPage;

// Description:
// This file is the main app page that users are directed to for uploading images.
// It includes the header and footer components for consistency and the UploadForm component for users to upload their images.
// The page allows users to upload up to 4 images for AI analysis and receive a report.
