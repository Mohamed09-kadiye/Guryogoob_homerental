// Import necessary components and libraries
'use client';
import { useEffect, useState } from 'react';
import { HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { nextImageLoaderRegex } from 'next/dist/build/webpack-config';
import Image from 'next/image'; // Import the Image component

interface PropertyDetails {
  id: number;
  propertyName: string;
  type: string;
  description: string;
  price: number;
  roomCount: number;
  location: string;
  imageUrl:string;
  dateCreated: Date;
  available: boolean;
  ownerId: number;
}

interface ProfileProps {
  detail?: PropertyDetails;
}

const PropertyProfile: React.FC<ProfileProps> = ({ detail }) => {
  const router = useRouter();

  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="flex">
        {/* Property Image */}
        <div className="mr-8">
          <label htmlFor="image" className="block text-sm font-medium">
            Property Image
          </label>
          {detail.imageUrl && (
            <Image
              src={`/images/${detail.imageUrl}`}
              alt="Property Image"
              className="mt-2 rounded-md"
              width={500} // Specify your preferred width
              height={300} // Specify your preferred height
            />
          )}
        </div>
  
        {/* Property Details */}
        <div>
          {/* Property Name */}
          <div className="mb-4">
            <label htmlFor="propertyName" className="block text-sm font-medium">
              Property Name
            </label>
            <div className="flex items-center">
              <HomeIcon className="h-6 w-6 mr-2 text-gray-500" />
              <span className="text-gray-800">{detail.propertyName}</span>
            </div>
          </div>
  
          {/* Type */}
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium">
              Type
            </label>
            <div className="text-gray-800">{detail.type}</div>
          </div>
  
          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <div className="text-gray-800">{detail.description}</div>
          </div>
  
          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium">
              Price
            </label>
            <div className="text-gray-800">${detail.price}</div>
          </div>
  
          {/* Created At */}
          <div className="mb-4">
            <label htmlFor="createdAt" className="block text-sm font-medium">
              Created At
            </label>
            <div className="text-gray-800">{detail.dateCreated.toString()}</div>
          </div>
  
          {/* Availability */}
          <div className="mb-4">
            <label htmlFor="available" className="block text-sm font-medium">
              Availability
            </label>
            <div className="text-gray-800">{detail.available ? 'Available' : 'Not Available'}</div>
          </div>
  
          {/* Owner ID */}
          <div className="mb-4">
            <label htmlFor="ownerId" className="block text-sm font-medium">
              Owner ID
            </label>
            <div className="text-gray-800">{detail.ownerId}</div>
          </div>
  
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/properties"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default PropertyProfile;
