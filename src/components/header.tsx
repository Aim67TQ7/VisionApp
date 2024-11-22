// Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">CurbAppeal AI</Link>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/app">App</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

// Description:
// This file is the header component for the website. It includes a logo that links to the homepage and a navigation bar.
// The navigation bar provides links to the home page, app page, pricing page, and contact page.
// The Link component from react-router-dom is used for client-side navigation.
