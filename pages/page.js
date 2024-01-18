import React from 'react';
import Layout from '../components/layout';
import Navbar from '../components/Navbar';
import Image from 'next/image';

const Home = () => {
  return (
    <Layout>
      <Navbar />
      <main className="flex min-h-screen items-center justify-between p-24">
        <div className="flex flex-col">
          <span className="text-black text-8xl font-bold mb-4">
          The Best, 
          </span>
          <span className="text-black text-8xl font-bold mb-4">
           Camel Milk,
          </span>
          <span className="text-black text-6xl font-bold">
           That You Give it
          </span>
          <span className="text-black text-8xl font-bold">
          To Your Kids.
          </span>
          <p className="text-gray-600 text-lg mt-4">
            We Have Fresh  Milk From somalia.
          </p>
          <p className="text-gray-500 text-sm mt-2">- Caanaha Waa Free Hadii Roob Ladago</p>
          <div className="flex mt-4">
        <button
          className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded transition"
          style={{ backgroundColor: '#27AAD5' }}
        >
          Order
        </button>
        <button className="px-3 py-1  text-white-500 hover:text-blue-600 py-1 rounded transition" >
          experiece it
        </button>
      </div>
        </div>
       
        <div className="ml-8">
          <div className="w-500 h-500 rounded-full  flex items-right justify-right">
          <Image
  src="/image2.png"  // Ensure the path starts with a leading slash
  alt="Project Showcase"
  width={600}
  height={600}
/>
          </div>
        </div>
       
      </main>
    </Layout>
  );
};

export default Home;