import React from 'react';
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Fortunate Forum</p>
      </div>
    </footer>
  );
};

export default Footer;
