import React from 'react';
import Layout from '../components/layout';
import Navbar from '../components/Navbar';

const AboutPage = () => {
  const teamMembers = [
    { name: 'Mohamed Abinor', position: 'CEO' },
    { name: 'Sayid hassen', position: 'Marketing Manager' },
    { name: 'Meymuun', position: 'Operations Manager' },
    { name: 'Amina faarax qore', position: 'Finance Manager' },
  ];

  return (
    <Layout>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center p-24">
        <div className="max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-8">About Our Company</h1>
          <p className="text-gray-600 mb-8">
            We are a leading dairy company in Somalia, dedicated to providing high-quality milk products to our customers. Our focus is on delivering nutritious and delicious dairy products that meet the highest standards of quality and taste.
          </p>

          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-600 mb-8">
            Meet our talented team of professionals who work tirelessly to ensure the success of Somali Board:
          </p>

          {teamMembers.map((member, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.position}</p>
            </div>
          ))}

          <h2 className="text-2xl font-bold mb-4">Milk Sourcing</h2>
          <p className="text-gray-600">
            To ensure the highest quality milk, we work closely with local Somali farmers who maintain healthy and well-cared-for dairy herds. Our farmers follow sustainable farming practices and provide the best conditions for their cows, ensuring the milk we obtain is fresh, pure, and rich in nutrients.
          </p>
        </div>
      </main>
    </Layout>
  );
};

export default AboutPage;