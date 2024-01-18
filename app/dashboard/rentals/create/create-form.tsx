// Import necessary libraries and components
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Select from 'react-select'; // Import the Select component
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';

// Define the SelectOption type
type SelectOption = {
  value: string;
  label: string;
};

const CreateRentalForm: React.FC = () => {
  const router = useRouter();
  const [rentalDate, setRentalDate] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [ownerId, setOwnerId] = useState('');

  const [customerOptions, setCustomerOptions] = useState<SelectOption[]>([]);
  const [propertyOptions, setPropertyOptions] = useState<SelectOption[]>([]);
  const [ownerOptions, setOwnerOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    // Fetch customer options and set them in state
    const fetchCustomersOptions = async () => {
      const response = await fetch('http://localhost:9092/api/customers/');
      const customers = await response.json();

      const options = customers.map((customer: any) => ({
        value: String(customer.id),
        label: customer.fullName,
      }));

      setCustomerOptions(options);
    };

    // Fetch property options and set them in state
    const fetchPropertiesOptions = async () => {
      const response = await fetch('http://localhost:9092/api/properties');
      const properties = await response.json();

      const options = properties.map((property: any) => ({
        value: String(property.id),
        label: property.propertyName,
      }));

      setPropertyOptions(options);
    };

    // Fetch owner options and set them in state
    const fetchOwnersOptions = async () => {
      const response = await fetch('http://localhost:9092/api/owners');
      const owners = await response.json();

      const options = owners.map((owner: any) => ({
        value: String(owner.id),
        label: owner.fullName,
      }));

      setOwnerOptions(options);
    };

    // Call the fetch functions
    fetchCustomersOptions();
    fetchPropertiesOptions();
    fetchOwnersOptions();
  }, []);

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:9092/api/rentals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rentalDate,
          customer: { id: Number(customerId) },
          property: { id: Number(propertyId) },
          owner: { id: Number(ownerId) },
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create rental');
      }

      // If successful, refresh and navigate
      router.refresh();
      router.push('/dashboard/rentals/');
    } catch (error) {
      console.error('Error creating rental:', error);
    }
  };

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
              onChange={(selectedOption) => setCustomerId(selectedOption?.value || '')}
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
              onChange={(selectedOption) => setPropertyId(selectedOption?.value || '')}
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
              onChange={(selectedOption) => setOwnerId(selectedOption?.value || '')}
            />
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/rentals"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit">Create Rental</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRentalForm;
