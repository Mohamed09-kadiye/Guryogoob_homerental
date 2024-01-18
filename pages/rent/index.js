// pages/rent/index.js
import React from 'react';
import Layout from '../components/layout';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

const Rent = () => {
  const router = useRouter();

  // Add your rent functionality here

  const handleRent = async () => {
    try {
      // Perform the necessary steps for renting
      // ...

      // Redirect to the success page after successful rent
      router.push('/rent/success');
    } catch (error) {
      console.error('Error during rent:', error);
      // Handle error scenarios
    }
  };

  return (
    <Layout>
      <Navbar />
      <main className="min-h-screen p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-4xl font-bold mb-4">Rent Property</h1>
          {/* Add your rent form or content here */}
          <button
            onClick={handleRent}
            className="bg-green-500 text-white py-3 px-6 rounded-md mt-2 flex items-center"
          >
            Proceed to Rent
          </button>
        </div>
      </main>
    </Layout>
  );
};


export default Rent;
