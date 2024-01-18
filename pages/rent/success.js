// pages/rent/success.js
import React from 'react';
import Layout from '../components/layout';
import Navbar from '../components/Navbar';

const RentSuccess = () => {
  return (
    <Layout>
      <Navbar />
      <main className="min-h-screen p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-4xl font-bold mb-4">Rent Successful</h1>
          <p>Your rental process was successful. Thank you for choosing GuryoGoob!</p>
          {/* Add additional success content as needed */}
        </div>
      </main>
    </Layout>
  );
};

export default RentSuccess;
