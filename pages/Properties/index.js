import React from 'react';
import Layout from '../components/layout';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import styles from '../styles/globals.css'; // Make sure this path is correct
import Footer from '../components/footer.js';
import { ArrowRightIcon, HeartIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const ServicePage = ({ properties }) => {
  const popularCities = properties.filter(property => property.location === "Mogadishu");
  const topRatedHouses = properties.filter(property => property.type === "House");

  const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;
  const SmartCard = ({ property }) => (
    <div className={`bg-white p-6 rounded-lg shadow-lg ${styles.zoomEffect} cursor-pointer hover:shadow-2xl transition duration-300 ease-in-out`}>
      <div className="relative mb-2">
        <Image src={`/images/${property.imageUrl}`} alt={property.propertyName} width={800} height={500} className="rounded-lg" />
        <div className="absolute top-2 right-2 flex items-center space-x-1">
          <ArrowRightIcon className="h-8 w-8 text-white bg-blue-500 rounded-full p-2" />
          <HeartIcon className="h-8 w-8 text-white bg-red-500 rounded-full p-2" />
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-black">{property.propertyName}</h2>
        <h6 className="text-lg font-italic text-black mt-2">Price: ${property.price} | Location: {property.location}</h6>
        <p className="text-lg font-italic text-grey mt-2">Room Count: {property.roomCount}</p>
      </div>
      <div className="flex justify-between items-center mt-6">
        <div className="text-lg text-gray-500"></div>
        <div className="flex space-x-4">
          <div className="text-lg text-blue-500">Details</div>
          <div className="text-lg text-gray-500">Contact</div>
        </div>
      </div>
    </div>
  );
  

  return (
    <Layout>
      <Navbar />
      <main className="min-h-screen items-center justify-between p-14">
        <div className="min-h-screen">
          {popularCities.length > 0 && (
            <div className="mt-10">
              <h2 className="text-3xl font-bold mb-6">Popular Cities</h2>
              <div className="grid grid-cols-2 gap-6">
                {popularCities.map((cityProperty) => (
                  <Link href={`/property/${cityProperty.id}`} key={cityProperty.id}>
                    <SmartCard property={cityProperty} />
                  </Link>
                ))}
              </div>
            </div>
          )}
          {topRatedHouses.length > 0 && (
            <div className="mt-10">
              <h2 className="text-3xl font-bold mb-6">Top Rated Houses</h2>
              <div className="grid grid-cols-2 gap-6">
                {topRatedHouses.map((houseProperty) => (
                  <Link href={`/property/${houseProperty.id}`} key={houseProperty.id}>
                    <SmartCard property={houseProperty} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mt-10">
            {properties.map((property) => (
              <Link key={property.id} href={`/property/${property.id}`}>
                <SmartCard property={property} />
              </Link>
            ))}
          </div>
        </div>

        <footer style={{ marginTop: '5rem' }} className="bg-gray-100 rounded-lg text-black p-8">
          <div className="container mx-auto flex justify-between items-center">
            {/* ... (your existing footer content) ... */}
          </div>
        </footer>
      </main>
    </Layout>
  );
};

export async function getServerSideProps() {
  // Fetch data from the API
  const res = await fetch('http://localhost:9092/api/properties');
  const properties = await res.json();

  return {
    props: {
      properties,
    },
  };
}

export default ServicePage;
