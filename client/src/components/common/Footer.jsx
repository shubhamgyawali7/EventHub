// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} EventHub. All rights reserved.</p>
        
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link to="/about" className="hover:text-yellow-400">About</Link>
          <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
          <Link to="/privacy" className="hover:text-yellow-400">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
