import React, { useState } from 'react';
import Layout from '../components/layout';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import styles from '../styles/globals.css'; // Make sure this path is correct
import { ArrowRightIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const Home = ({ properties }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const popularCities = properties.filter(property => property.location === "Mogadishu");
  const topRatedHouses = properties.filter(property => property.type === "House");

  const filteredProperties = properties.filter(property =>
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const SmartCard = ({ property }) => (
    <div className={`bg-white p-4 rounded-lg shadow-md ${styles.zoomEffect}`}>
      <Image src={`/images/${property.imageUrl}`} alt={property.propertyName} width={400} height={300} className="rounded" />
      <h2 className="text-xl font-bold text-black mt-2">{property.propertyName}</h2>
      <h6 className="text-xl font-italic text-black mt-2">Price: ${property.price} | <br /> Location: {property.location}</h6>
      <p className="text-xl font-italic text-grey mt-2">Room Count: {property.roomCount}  </p>
    </div>
  );

  

  return (
    <Layout>
      <Navbar />
      <main className="min-h-screen items-center justify-between p-14">
        <div className="min-h-screen">
          <div
            style={{ marginTop: '-3rem' }}
            className="w-full h-60 mp p-10 text-center bg-white border border-white-200 rounded-2xl shadow-2xl shadow sm:p- dark:bg-blue-500 dark:border-blue-700 transition duration-30000 hover:shadow-lg hover:border-blue-500"
          >
            <br />
            <h5 className="text-5xl text-center font-bold text-gray-900 dark:text-white">
              Find Your Perfect Home With Guryogoob
            </h5>
            <br />
            <p className="text-base text-gray-900 dark:text-white">
              1,480 Properties are waiting For you! at Guryogoob.
            </p>
          </div>
          <br />
           {/* New Section with Input Fields */}
           <div
              style={{ marginLeft: '15rem', marginTop: '-4rem', width: '750px', height: '70px' }}
              className="bg-white p-0 px-4 rounded-full shadow-full ml-1 flex flex-center justify-between items-center justify-center transition duration-30000 hover:shadow-2xl hover:border-blue-500"
            >
              <div className="flex ml-4 flex-col px-4 mb-1">
              <label className="text-sm text-gray-700 text-black p- mt-3" htmlFor="location">
                Location
              </label>
              <input
                type="text"
                placeholder="where are you looking to?"
                id="location"
                name="location"
                className="rounded-full p-0 border border-white focus:outline-none focus:border-gray-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              </div>

              <div className="flex ml-2 flex-col">
                <label className="text-sm text-gray-700 p- mt-3 text-black" htmlFor="checkIn">
                  Check-In Date
                </label>
                <input
                  type="date"
                  placeholder="date"
                  id="checkIn"
                  name="checkIn"
                  className="rounded-full p-0 border border-white focus:outline-none focus:border-gray-100"
                />
              </div>

              <div className="flex ml-2 flex-col">
                <label className="text-sm text-gray-700 p- mt-3 text-black mb-1" htmlFor="checkOut">
                  Check-Out Date
                </label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  className="rounded-full p-0 border border-white focus:outline-none focus:border-gray-100"
                />
              </div>

              <button className="bg-blue-500 text-white py-3 ml-12 px-5 rounded-full flex items-center">
                <div></div>
                <ArrowRightIcon className="w-5" />
              </button>
            </div>
            
        
          {searchQuery && (
            <div className="mt-10">
              <h2 className="text-3xl font-bold mb-6">Search Results for {searchQuery}</h2>
              <div className="grid grid-cols-4 gap-3 mt-10">
                {filteredProperties.map((property) => (
                  <Link key={property.id} href={`/property/${property.id}`}>
                    <div className={`bg-white p-4 rounded-lg shadow-md ${styles.zoomEffect}`}>
                      <Image src={`/images/${property.imageUrl}`} alt={property.propertyName} width={400} height={300} className="rounded" />
                      <h2 className="text-xl font-bold text-black mt-2">{property.propertyName}</h2>
                      <h6 className="text-xl font-italic text-black mt-2">Price: ${property.price} | <br /> Location: {property.location}</h6>
                      <p className="text-xl font-italic text-grey mt-2">Room Count: {property.roomCount} </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Existing popularCities section */}
          {popularCities.length > 0 && (
            <div className="mt-10">
              <h2 className="text-3xl font-bold mb-6">Popular Cities</h2>
              <div className="grid grid-cols-5 gap-6">
                {popularCities.map((cityProperty) => (
                  <Link href={`/property/${cityProperty.id}`} key={cityProperty.id}>
                    <div className={`bg-white p-4 rounded-lg shadow-md ${styles.zoomEffect}`}>
                      <Image src={`/images/${cityProperty.imageUrl}`} alt={cityProperty.propertyName} width={400} height={300} className="rounded" />
                      <h2 className="text-xl font-bold text-black mt-2">{cityProperty.propertyName}</h2>
                      <h6 className="text-xl font-italic text-black mt-2">Price: ${cityProperty.price} | <br /> Location: {cityProperty.location}</h6>
                      <p className="text-xl font-italic text-grey mt-2">Room Count: {cityProperty.roomCount}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}



            {popularCities.length > 0 && (
              <div className="mt-10">
                <h2 className="text-3xl font-bold mb-6">Popular Cities</h2>
                <div className="grid grid-cols-5 gap-6">
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
                <div className="grid grid-cols-6 gap-6">
                  {topRatedHouses.map((houseProperty) => (
                    <Link href={`/property/${houseProperty.id}`} key={houseProperty.id}>
                      <SmartCard property={houseProperty} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

<h2 className="text-3xl font-bold mb-6">Recommended</h2>
<div className="grid grid-cols-4 gap-3 mt-10">
              {properties.map((property) => (
                <Link key={property.id} href={`/property/${property.id}`}>
                  
                  <div className={`bg-white p-4 rounded-lg shadow-md ${styles.zoomEffect}`}>
                    <Image src={`/images/${property.imageUrl}`} alt={property.propertyName} width={400} height={300} className="rounded" />
                    <h2 className="text-xl font-bold text-black mt-2">{property.propertyName}</h2>
                    <h6 className="text-xl font-italic text-black mt-2">Price: ${property.price} | <br /> Location: {property.location}</h6>
                    <p className="text-xl font-italic text-grey mt-2">Room Count: {property.roomCount}  </p>
                  </div>
                </Link>
              ))}
            </div>

            <h2 className="text-3xl font-bold mb-6">Popular Cities</h2>
            <div className="grid grid-cols-4 gap-3 mt-10">
              {properties.map((property) => (
                <Link key={property.id} href={`/property/${property.id}`}>
             
                  <div className={`bg-white p-4 rounded-lg shadow-md ${styles.zoomEffect}`}>
                    <Image src={`/images/${property.imageUrl}`} alt={property.propertyName} width={400} height={300} className="rounded" />
                    <h2 className="text-xl font-bold text-black mt-2">{property.propertyName}</h2>
                    <h6 className="text-xl font-italic text-black mt-2">Price: ${property.price} | <br /> Location: {property.location}</h6>
                    <p className="text-xl font-italic text-grey mt-2">Room Count: {property.roomCount}  </p>
                  </div>
                </Link>
              ))}
            </div>



          {/* Existing topRatedHouses section */}
          {topRatedHouses.length > 0 && (
            <div className="mt-10">
              <h2 className="text-3xl font-bold mb-6">Top Rated Houses available</h2>
              <div className="grid grid-cols-6 gap-6">
                {topRatedHouses.map((houseProperty) => (
                  <Link href={`/property/${houseProperty.id}`} key={houseProperty.id}>
                    <div className={`bg-white p-4 rounded-lg shadow-md ${styles.zoomEffect}`}>
                      <Image src={`/images/${houseProperty.imageUrl}`} alt={houseProperty.propertyName} width={400} height={300} className="rounded" />
                      <h2 className="text-xl font-bold text-black mt-2">{houseProperty.propertyName}</h2>
                      <h6 className="text-xl font-italic text-black mt-2">Price: ${houseProperty.price} | <br /> Location: {houseProperty.location}</h6>
                      <p className="text-xl font-italic text-grey mt-2">Room Count: {houseProperty.roomCount}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <footer style={{ marginTop: '5rem' }} className="bg-gray-100 rounded-lg text-black p-8">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex flex-row items-center leading-none text-blue-500">
              <BuildingOffice2Icon className="h-12 w-12" />
              <p className="text-[24px]">Guryogoob</p>
            </div>
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
            <p className="text-sm">&copy; 2023 GuryoGoob. All rights reserved.</p>
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

export default Home;
