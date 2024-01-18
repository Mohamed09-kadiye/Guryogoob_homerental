// Import necessary components and libraries
'use client';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface OwnerDetails {
  id: number;
  fullName: string;
  address: string;
  telephoneNumber: string;
}

const EditOwnerForm: React.FC<{ detail: OwnerDetails | undefined }> = ({ detail }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        if (!detail) {
          console.error('Owner details are undefined.');
          return;
        }

        const res = await fetch(`http://localhost:9092/api/owners/${detail.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch owner details');
        }

        const ownerData: OwnerDetails = await res.json();
        setFullName(ownerData.fullName);
        setAddress(ownerData.address);
        setTelephoneNumber(ownerData.telephoneNumber);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching owner details:', error);
      }
    };

    fetchOwnerDetails();
  }, [detail]);

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!detail) {
        console.error('Owner details are undefined.');
        return;
      }

      const res = await fetch(`http://localhost:9092/api/owners/${detail.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          address,
          telephoneNumber,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update owner');
      }

      // If successful, navigate to the owners page
      router.replace('/dashboard/owners');
    } catch (error) {
      console.error('Error updating owner:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="">
        <form onSubmit={sendForm}>
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium">
              Enter Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="John Doe"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium">
              Enter Address
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="123 Main Street"
              />
            </div>
          </div>

          {/* Telephone Number */}
          <div className="mb-4">
            <label htmlFor="telephoneNumber" className="block text-sm font-medium">
              Enter Telephone Number
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                type="tel"
                id="telephoneNumber"
                name="telephoneNumber"
                value={telephoneNumber}
                onChange={(e) => setTelephoneNumber(e.target.value)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="123-456-7890"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/owners"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit">Update Owner</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOwnerForm;
