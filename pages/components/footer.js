import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white p-8">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold mb-4">GuryoGoob Home Rental</h3>
          <p className="text-sm">Find your perfect home with GuryoGoob. 1,480,02 properties are waiting for you!</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          <p className="text-sm">123 Main Street, Cityville</p>
          <p className="text-sm">Email: info@guryogoob.com</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
          <ul className="text-sm">
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm">&copy; {currentYear} GuryoGoob. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
