// PricingPage.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PricingPage: React.FC = () => {
  return (
    <div className="pricing-page">
      {/* Header Component */}
      <Header />

      {/* Main Pricing Section */}
      <main>
        <h2>Pricing Plans</h2>
        <p>Choose the plan that fits your needs best and continue enhancing your curb appeal with AI assistance.</p>
        <div className="pricing-plans">
          <div className="plan basic">
            <h3>Basic Plan</h3>
            <p>Get started with 3 free uses of our image evaluation tool.</p>
            <p>Price: Free</p>
          </div>
          <div className="plan pro">
            <h3>Pro Plan</h3>
            <p>Unlimited usage, enhanced reporting, and priority support.</p>
            <p>Price: $19.99/month</p>
            <button className="cta-btn">Get Pro Plan</button>
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default PricingPage;

// Description:
// This file is the pricing page that displays the different pricing options available to users.
// It includes the header and footer components for consistency, and it outlines the Basic (free) and Pro (paid) plans.
// The page provides a CTA button for upgrading to the Pro plan.
