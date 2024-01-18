
'use client';
// Import necessary components and libraries
import Link from 'next/link';
import { MapIcon, UserCircleIcon, HomeIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { PhoneArrowUpRightIcon } from '@heroicons/react/20/solid';

interface OwnerDetails {
  id: number;
  fullName: string;
  address: string;
  telephoneNumber: string;
}

interface PropertyDetails {
  id: number;
  propertyName: string;
  type: string;
  description: string;
  price: number;
  createdAt:Date;
  available: boolean;
  ownerId: number;
}

const Profile: React.FC<{ detail?: OwnerDetails }> = ({ detail }) => {
  const router = useRouter();
  const [propertiesOwned, setPropertiesOwned] = useState<PropertyDetails[]>([]);

  useEffect(() => {
    // Assuming detail.id is the correct owner ID
    const fetchPropertiesOwned = async () => {
      try {
        if (!detail) {
          console.error('Owner details are undefined.');
          return;
        }
    
        const res = await fetch(`http://localhost:9092/api/properties?ownerId=${detail.id}`);
        if (!res.ok) {
          
          throw new Error('Failed to fetch properties owned by the owner');
        }
    
        const propertiesData: PropertyDetails[] = await res.json();
        console.log(`Fetching properties for owner ID: ${detail.id}`);
        console.log('Fetched Properties Data:', propertiesData);
    
        setPropertiesOwned(propertiesData.filter(property => property.ownerId === detail.id));
      } catch (error) {
        console.error('Error fetching properties owned by the owner:', error);
      }
    };
    
    
    

    fetchPropertiesOwned();
  }, [detail]);

  const handleEditClick = () => {
    if (detail) {
      router.push(`/dashboard/owners/edit/${detail.id}`);
    }
  };

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="">
        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium">
            Full Name
          </label>
          <div className="flex items-center">
            <UserCircleIcon className="h-6 w-6 mr-2 text-gray-500" />
            <span className="text-gray-800">{detail?.fullName}</span>
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium">
            Address
          </label>
          <div className="flex items-center">
            <MapIcon className="h-6 w-6 mr-2 text-gray-500" />
            <div className="text-gray-800">{detail?.address}</div>
          </div>
        </div>

        {/* Telephone Number */}
        <div className="mb-4">
          <label htmlFor="telephoneNumber" className="block text-sm font-medium">
            Telephone Number
          </label>
          <div className="flex items-center">
            <PhoneArrowUpRightIcon className="h-6 w-6 mr-2 text-gray-500" />
            <div className="text-gray-800">{detail?.telephoneNumber}</div>
          </div>
        </div>

       {/* Properties Owned */}
      <div className="mb-4">
        <label htmlFor="propertiesOwned" className="block text-sm font-medium">
          Properties Owned
        </label>
        {propertiesOwned.length > 0 ? (
          propertiesOwned.map((property) => (
            <div key={property.id} className="flex items-center mb-2">
              <HomeIcon className="h-6 w-6 mr-2 text-gray-500" />
              <div className="text-gray-800">{property.propertyName+"  price is     ,  "} </div><br />
              <div className="text-gray-800">{"   $"+property.price}<br /></div>

            </div>
          ))
        ) : (
          <div className="text-gray-800">No properties owned by the owner</div>
        )}
      </div>


        <div className="mt-6 flex justify-end gap-4">
          <Button onClick={handleEditClick}>Edit</Button>
          <Link
            href="/dashboard/owners"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
