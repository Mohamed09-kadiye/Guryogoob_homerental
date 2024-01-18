// Import necessary libraries and components
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Select from 'react-select'; // Import the Select component
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';

interface RentalDetails {
  id: number;
  rentalDate: string;
  customer: {
    id: number;
  };
  property: {
    id: number;
  };
  owner: {
    id: number;
  };
}

const EditRentalForm: React.FC<{ detail: RentalDetails | undefined }> = ({ detail }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [rentalDate, setRentalDate] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [ownerId, setOwnerId] = useState('');

  const [customerOptions, setCustomerOptions] = useState<{ value: string; label: string }[]>([]);
  const [propertyOptions, setPropertyOptions] = useState<{ value: string; label: string }[]>([]);
  const [ownerOptions, setOwnerOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const fetchRentalDetails = async () => {
      try {
        if (!detail) {
          console.error('Rental details are undefined.');
          return;
        }

        // Fetch rental details
        const res = await fetch(`http://localhost:9092/api/rentals/${detail.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch rental details');
        }

        const rentalData: RentalDetails = await res.json();
        setRentalDate(rentalData.rentalDate);
        setCustomerId(rentalData.customer.id.toString());
        setPropertyId(rentalData.property.id.toString());
        setOwnerId(rentalData.owner.id.toString());

        // Fetch options for the dropdowns
        const customerOptionsRes = await fetch('http://localhost:9092/api/customers/');
        const propertyOptionsRes = await fetch('http://localhost:9092/api/properties');
        const ownerOptionsRes = await fetch('http://localhost:9092/api/owners');

        if (!customerOptionsRes.ok || !propertyOptionsRes.ok || !ownerOptionsRes.ok) {
          throw new Error('Failed to fetch dropdown options');
        }

        const customerOptionsData = await customerOptionsRes.json();
        const propertyOptionsData = await propertyOptionsRes.json();
        const ownerOptionsData = await ownerOptionsRes.json();

        setCustomerOptions(customerOptionsData.map((customer: any) => ({ value: customer.id.toString(), label: customer.fullName })));
        setPropertyOptions(propertyOptionsData.map((property: any) => ({ value: property.id.toString(), label: property.propertyName })));
        setOwnerOptions(ownerOptionsData.map((owner: any) => ({ value: owner.id.toString(), label: owner.fullName })));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching rental details or dropdown options:', error);
      }
    };

    fetchRentalDetails();
  }, [detail]);

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!detail) {
        console.error('Rental details are undefined.');
        return;
      }

      const res = await fetch(`http://localhost:9092/api/rentals/${detail.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rentalDate,
          customer: { id: Number(customerId) },
          property: { id: Number(propertyId) },
          owner: { id: Number(ownerId) },
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update rental');
      }

      // If successful, navigate to the rentals page
      router.replace('/dashboard/rentals');
    } catch (error) {
      console.error('Error updating rental:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="">
        <form onSubmit={sendForm}>
          {/* Rental Date */}
          <div className="mb-4">
            <label htmlFor="rentalDate" className="block text-sm font-medium">
              Enter Rental Date
            </label>
            <div className="relative">
              <input
                type="text"
                id="rentalDate"
                name="rentalDate"
                value={rentalDate}
                onChange={(e) => setRentalDate(e.target.value)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="2023-01-01T12:00:00"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Customer ID Dropdown */}
          <div className="mb-4">
            <label htmlFor="customerId" className="block text-sm font-medium">
              Select Customer
            </label>
            <Select
              options={customerOptions}
              value={customerOptions.find((option) => option.value === customerId)}
              onChange={(selectedOption: { value: string; label: string } | null) =>
                setCustomerId(selectedOption?.value || '')
              }
            />
          </div>

          {/* Property ID Dropdown */}
          <div className="mb-4">
            <label htmlFor="propertyId" className="block text-sm font-medium">
              Select Property
            </label>
            <Select
              options={propertyOptions}
              value={propertyOptions.find((option) => option.value === propertyId)}
              onChange={(selectedOption: { value: string; label: string } | null) =>
                setPropertyId(selectedOption?.value || '')
              }
            />
          </div>

          {/* Owner ID Dropdown */}
          <div className="mb-4">
            <label htmlFor="ownerId" className="block text-sm font-medium">
              Select Owner
            </label>
            <Select
              options={ownerOptions}
              value={ownerOptions.find((option) => option.value === ownerId)}
              onChange={(selectedOption: { value: string; label: string } | null) =>
                setOwnerId(selectedOption?.value || '')
              }
            />
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/rentals"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit">Update Rental</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRentalForm;
