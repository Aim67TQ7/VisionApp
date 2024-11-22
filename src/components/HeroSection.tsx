// HeroSection.tsx
import React from 'react';
import { useHistory } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const history = useHistory();

  const handleGetStartedClick = () => {
    // Redirect to the AppPage for uploading photos
    history.push('/app');
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Welcome to CurbAppeal AI</h1>
        <p>Enhance the beauty and value of your home with AI-powered insights.</p>
        <button onClick={handleGetStartedClick} className="get-started-btn">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

// Description:
// This file is the hero section component for the landing page. It contains a welcoming banner with a headline, 
// a short description, and a call-to-action button that navigates users to the AppPage where they can upload images.
// The useHistory hook from react-router-dom is used to handle navigation.
