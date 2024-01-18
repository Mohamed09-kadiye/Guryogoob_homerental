'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/dashboard/users/search';
import { lusitana } from '@/app/ui/fonts';
import { CreateRental, UpdateRental, ProfileRental, DeleteRental } from '@/app/dashboard/rentals/buttons';

import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

// Define an interface for the rental object
interface RentalsProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

interface Rental {
  id: number;
  rentalDate: string;
  customer: {
    fullName: string;
  };
  property: {
    propertyName: string;
    price: number;
  };
  owner: {
    id: number;
    fullName: string;
  };
}

async function getRentals(query: string): Promise<Rental[]> {
  try {
    const res = await fetch(`http://localhost:9092/api/rentals?query=${query}`);
    if (!res.ok) {
      console.error('Failed to fetch rentals:', res.status, res.statusText);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching rentals:', error);
    return [];
  }
}



function Rentals({ searchParams }: RentalsProps) {
  const [filteredRentals, setFilteredRentals] = useState<Rental[]>([]);
  const query = searchParams?.query || '';

  useEffect(() => {
    console.log('Fetching rentals with query:', query);

    const fetchRentals = async () => {
      let rentals;

      // If the query is empty, fetch all rentals
      if (query === '') {
        rentals = await getRentals('');
      } else {
        rentals = await getRentals(query);
      }

      // Filter rentals based on the query
      const filteredRentals = rentals.filter((rental) =>
        Object.values(rental).some((value) => {
          // Check if the value is not null or undefined before calling toString
          if (value != null && value.toString) {
            return value.toString().toLowerCase().includes(query.toLowerCase());
          }
          return false;
        })
      );

      console.log('Filtered rentals:', filteredRentals);
      setFilteredRentals(filteredRentals);
    };

    fetchRentals();
  }, [query]);


  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Rentals</h1>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search owners..." />
            <CreateRental />
          </div>
        </div>
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
               
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Rental Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Customer
                </th> 
                <th scope="col" className="px-3 py-5 font-medium">
                  Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Property
                </th>
               
                <th scope="col" className="px-3 py-5 font-medium">
                  Owner
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredRentals.map((rental: Rental) => (
                <tr
                  key={rental.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{rental.rentalDate}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{rental.customer.fullName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{'$'+rental.property.price}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{rental.property.propertyName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{rental.owner.fullName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex justify-end gap-3">
                      {/* Replace with your update, profile, delete buttons */}
                      <UpdateRental id={rental.id.toString()} />
                      <ProfileRental id={rental.id.toString()} />
                      <DeleteRental id={rental.id.toString()} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Rentals;

