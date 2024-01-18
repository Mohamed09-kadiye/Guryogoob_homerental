// components/PaymentsProfile.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PhoneArrowUpRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import Link from 'next/link';

interface PaymentDetails {
  id: number;
  paymentDate: string;
  customer: {
    id: number;
    fullName: string;
  };
  owner: {
    id: number;
    fullName: string;
    telephoneNumber: string;
  };
  rental: {
    id: number;
    rentalDate: string;
    customer: {
      fullName: string;
    };
    property: {
      type: string;
      price: number;
      propertyName: string;
      description: string;
      roomCount: number;
      location: string;
    };
    owner: {
      fullName: string;
    };
  };
  price: number;
}

const PaymentsProfile: React.FC<{ detail?: PaymentDetails }> = ({ detail }) => {
  const router = useRouter();

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="">
        {/* Payment Date */}
        <div className="mb-4">
          <label htmlFor="paymentDate" className="block text-sm font-medium">
            Payment Date
          </label>
          <div className="flex items-center">
            <span className="text-gray-800">{detail?.paymentDate}</span>
          </div>
        </div>

        {/* Customer */}
        <div className="mb-4">
          <label htmlFor="customer" className="block text-sm font-medium">
            Customer
          </label>
          <div className="flex items-center">
            <span className="text-gray-800">{detail?.customer.fullName}</span>
          </div>
        </div>
        

        {/* Owner */}
        <div className="mb-4">
          <label htmlFor="owner" className="block text-sm font-medium">
            Owner
          </label>
          <div className="flex items-center">
            <span className="text-gray-800">{detail?.owner.fullName}</span>
          </div>
        </div>
          {/* Owner */}
          <div className="mb-4">
          <label htmlFor="owner" className="block text-sm font-medium">
            Owner Tellephone
          </label>
          <div className="flex items-center">
            <span className="text-gray-800">{detail?.owner.telephoneNumber}</span>
          </div>
        </div>

        {/* Rental Details */}
        <div className="mb-4">
          <label htmlFor="rental" className="block text-sm font-medium">
            Rental Details
          </label>
          <div className="flex items-center">
            <span className="text-gray-800">
              Property Name: {detail?.rental.property.propertyName}, Loaction: {detail?.rental.property.location}
            </span>
            
          </div>
          <div className="flex items-center">
            <span className="text-gray-800">
              Property Type: {detail?.rental.property.type}, Price: ${detail?.rental.property.price}
            </span>
            
          </div>
          <div className="flex items-center">
            <span className="text-gray-800">
              Room Count: {detail?.rental.property.roomCount}, description: {detail?.rental.property.description}
            </span>
            
          </div>
        </div>
        

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-lg font-medium">
            Price
          </label>
          <div className="flex items-center">
            <span className="text-gray-800">${detail?.price}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          {/* Add buttons or actions as needed */}
          <Link href="#" >
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Statement
              </button>
          </Link>
          {/* Add a back link or button */}
          <Link
            href="/dashboard/payments"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentsProfile;
