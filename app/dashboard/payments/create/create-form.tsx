// components/PaymentCreateForm.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import Link from 'next/link';

interface Customer {
  id: number;
  fullName: string;
}

interface Owner {
  id: number;
  fullName: string;
}

interface Rental {
  id: number;
  rentalDate: string;
}

const PaymentCreateForm: React.FC = () => {
  const router = useRouter();
  const [paymentDate, setPaymentDate] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [rentalId, setRentalId] = useState('');
  const [price, setPrice] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);

  useEffect(() => {
    // Fetch data for dropdowns
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:9092/api/customers/');
        const data = await response.json();
        if (Array.isArray(data)) {
          setCustomers(data);
        } else {
          console.error('Invalid data format received for customers:', data);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    

    const fetchOwners = async () => {
      try {
        const response = await fetch('http://localhost:9092/api/owners');
        const data = await response.json();
        setOwners(data);
      } catch (error) {
        console.error('Error fetching owners:', error);
      }
    };

    const fetchRentals = async () => {
      try {
        const response = await fetch('http://localhost:9092/api/rentals');
        const data = await response.json();
        setRentals(data);
      } catch (error) {
        console.error('Error fetching rentals:', error);
      }
    };

    fetchCustomers();
    fetchOwners();
    fetchRentals();
  }, []);

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Convert string values to the appropriate types
    const parsedCustomerId = parseInt(customerId, 10);
    const parsedOwnerId = parseInt(ownerId, 10);
    const parsedRentalId = parseInt(rentalId, 10);
    const parsedPrice = parseFloat(price);
  
    // Log the parsed form data
    console.log({
      paymentDate,
      customerId: parsedCustomerId,
      ownerId: parsedOwnerId,
      rentalId: parsedRentalId,
      price: parsedPrice,
    });
  
    try {
      const res = await fetch("http://localhost:9092/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentDate,
          customer: { id: parsedCustomerId },
          owner: { id: parsedOwnerId },
          rental: { id: parsedRentalId },
          price: parsedPrice,
        }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to create payment");
      }
  
      // If successful, refresh and navigate
      router.refresh();
      router.push("/dashboard/payments");
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };
  ;

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="">
        <form onSubmit={sendForm}>
          {/* Payment Date */}
          <div className="mb-4">
            <label htmlFor="paymentDate" className="block text-sm font-medium">
              Enter Payment Date
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                id="paymentDate"
                name="paymentDate"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Customer Dropdown */}
          <div className="mb-4">
            <label htmlFor="customerId" className="block text-sm font-medium">
              Select Customer
            </label>
            <div className="relative mt-2 rounded-md">
              <select
                id="customerId"
                name="customerId"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
              >
                <option value="" disabled>
                  Choose a customer
                </option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id.toString()}>
                    {customer.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Owner Dropdown */}
          <div className="mb-4">
            <label htmlFor="ownerId" className="block text-sm font-medium">
              Select Owner
            </label>
            <div className="relative mt-2 rounded-md">
              <select
                id="ownerId"
                name="ownerId"
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
              >
                <option value="" disabled>
                  Choose an owner
                </option>
                {owners.map((owner) => (
                  <option key={owner.id} value={owner.id.toString()}>
                    {owner.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Rental Dropdown */}
          <div className="mb-4">
            <label htmlFor="rentalId" className="block text-sm font-medium">
              Select Rental
            </label>
            <div className="relative mt-2 rounded-md">
              <select
                id="rentalId"
                name="rentalId"
                value={rentalId}
                onChange={(e) => setRentalId(e.target.value)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
              >
                <option value="" disabled>
                  Choose a rental
                </option>
                {rentals.map((rental) => (
                  <option key={rental.id} value={rental.id.toString()}>
                    {rental.rentalDate}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium">
              Enter Price
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                type="text"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/payments"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit">Create Payment</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentCreateForm;
