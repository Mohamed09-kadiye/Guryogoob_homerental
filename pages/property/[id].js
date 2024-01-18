// pages/property/[id].js
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';

import React from 'react';
import Layout from '../components/layout';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import styles from '../styles/globals.css'; // Make sure this path is correct
import { ArrowRightIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PropertyDetails = ({ property, recommendedProperties }) => {
  const { id: propertyId, ownerId: owner } = property;

  const [customerUsername, setCustomerUsername] = useState('');

  const [selectedPropertyId, setSelectedPropertyId] = useState(propertyId);
  const [selectedOwnerId, setSelectedOwnerId] = useState(owner?.id || null); 
  console.log('Property ID:', propertyId);
  console.log(' Owner ID:',owner );
  
  useEffect(() => {
    const userid = window.sessionStorage.getItem('customerId');
    if (typeof window !== 'undefined' && userid) {
      setCustomerUsername(userid);
    }
  }, []);
  const { propertyName, type, description, price, roomCount, location, dateCreated, available, imageUrl } = property;
    
  const handleContactHost = () => {
    // Display sweet alert
    Swal.fire({
      icon: 'success',
      title: 'Contacting Host',
      text: 'You will contact the host soon. Thank you!',
      showConfirmButton: false,
      timer: 2000, 
    });

    
    setTimeout(() => {
      // Perform actions related to contacting the host
      console.log('Contacting host...');
    }, 2000); 
  };

  const handleProceedToRent = async () => {
    try {
      // Get the current date and time as a timestamp
      const rentalDate = new Date().toISOString();

      // Prepare the data for the API request
      const requestData = {
        rentalDate,
        customer: {
          id: parseInt(customerUsername), 
        },
        property: {
          id: parseInt(propertyId), 
        },
        owner: {
          id: parseInt(property.ownerId), 
        },
      };
      console.log(requestData);

      const response = await fetch('http://localhost:9092/api/rentals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
       
        Swal.fire({
          icon: 'success',
          title: 'Rent Request Successful',
          text: 'You have successfully submitted a rent request.',
          text: 'next you will pay the money and the home is yours',

        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Rent Request Failed',
          text: 'There was an error submitting the rent request. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error submitting rent request:', error);
    }
  };

  return (
    <Layout>
      <Navbar />
      <main className="min-h-screen p-4">
        <div className="container mx-auto mt-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="rounded-md overflow-hidden shadow-md">
              <Image src={`/images/${imageUrl}`} alt={propertyName} width={700} height={500} className="rounded-md" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4">{propertyName}</h1>
              <p className="text-lg text-gray-700">{description}</p>
              <div className="mt-4">
                <p className="text-lg">
                  <span className="font-bold">Type:</span> {type}
                </p>
                <p className="text-lg">
                  <span className="font-bold">Price:</span> ${price}
                </p>
                <p className="text-lg">
                  <span className="font-bold">Room Count:</span> {roomCount}
                </p>
                <p className="text-lg">
                  <span className="font-bold">Location:</span> {location}
                </p>
                <p className="text-lg">
                  <span className="font-bold">Date Created:</span> {new Date(dateCreated).toLocaleDateString()}
                </p>
                <p className="text-lg">
                  <span className="font-bold">Availability:</span> {available ? 'Available' : 'Not Available'}
                </p>
                <button         onClick={handleContactHost}
                    className="bg-blue-500 text-white py-3 px-6 rounded-md mt-4 flex items-center">
                  Contact Host
                  < ArrowRightIcon className="w-5 ml-2" />
                </button>
                 
             
                <button
                  onClick={handleProceedToRent}
                  className="bg-green-500 text-white py-3 px-6 rounded-md mt-2 flex items-center"
                  >
                  Proceed to Rent
                  <ArrowRightIcon className="w-5 ml-2" />
                </button>
             
              </div>
            </div>
          </div>
          {/* Recommended Properties */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Recommended Properties</h2>
            <div className="grid grid-cols-7 gap-10">
            {recommendedProperties.map((recommendedProperty) => (
                <Link key={recommendedProperty.id} href={`/property/${recommendedProperty.id}`}>
                
                    <div className="rounded-md overflow-hidden shadow-md">
                    <Image src={`/images/${recommendedProperty.imageUrl}`} alt={recommendedProperty.propertyName} width={800} height={400} className="rounded-md" />
                    <h2 className="text-xl font-bold text-black mt-2">{recommendedProperty.propertyName}</h2>
                    {/* Add other property details as needed */}
                    </div>
                
                </Link>
            ))}
            </div>


        </div>

        <footer style={{ marginTop: '5rem' }} className="bg-gray-100 rounded-lg text-black p-8">
          <div className="container mx-auto flex justify-between items-center">
            <div className={`${lusitana.className} flex flex-row items-center leading-none text-blue-500`}>
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

export async function getServerSideProps({ params }) {
  // Fetch data for the specific property ID
  const res = await fetch(`http://localhost:9092/api/properties/${params.id}`);
  const property = await res.json();

  // Fetch data for the last 10 properties based on dateCreated
  const recommendedRes = await fetch('http://localhost:9092/api/properties?_sort=dateCreated&_order=desc&_limit=10');
  const recommendedProperties = await recommendedRes.json();

  return {
    props: {
      property,
      recommendedProperties,
    },
  };
}

export default PropertyDetails;
