// Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} CurbAppeal AI. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a> |
          <a href="/terms">Terms of Service</a> |
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Description:
// This file is the footer component for the website. It includes copyright information with the current year.
// Additionally, it provides links to the privacy policy, terms of service, and contact page.
// The footer ensures consistent information at the bottom of every page.
