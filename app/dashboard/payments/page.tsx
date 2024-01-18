'use client';// components/Payments.js
import Search from '@/app/dashboard/payments/search';

import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { CreatePayment, UpdatePayment, ProfilePayment, DeletePayment } from '@/app/dashboard/payments/buttons';

interface Payment {
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
    };
    owner: {
      fullName: string;
    };
  };
  price: number;
}

async function getPayments(query: string): Promise<Payment[]> {
  try {
    const res = await fetch(`http://localhost:9092/api/payments?query=${query}`);
    if (!res.ok) {
      console.error('Failed to fetch payments:', res.status, res.statusText);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching payments:', error);
    return [];
  }
}

function Payments({ searchParams }: { searchParams?: { query?: string; page?: string } }) {
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const query = searchParams?.query || '';

  useEffect(() => {
    console.log('Fetching payments with query:', query);

    const fetchPayments = async () => {
      let payments;

      // If the query is empty, fetch all payments
      if (query === '') {
        payments = await getPayments('');
      } else {
        payments = await getPayments(query);
      }

      // Filter payments based on the query
      const filteredPayments = payments.filter((payment) =>
        Object.values(payment).some((value) => {
          if (value != null && value.toString) {
            return value.toString().toLowerCase().includes(query.toLowerCase());
          }
          return false;
        })
      );

      console.log('Filtered payments:', filteredPayments);
      setFilteredPayments(filteredPayments);
    };

    fetchPayments();
  }, [query]);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl">Payments</h1>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search owners..." />

           
            <CreatePayment />
          </div>
          <div className="mt-5 flex w-full justify-center">
            {/* Pagination or other components */}
          </div>
        </div>
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
               
                {/* <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Payment Date
                </th> */}
                <th scope="col" className="px-3 py-5 font-medium">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  property owner
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Rental type 
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total  
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  paid
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Balance
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredPayments.map((payment: Payment) => (
                <tr
                  key={payment.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                 
                  
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{payment.customer.fullName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{payment.owner.fullName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{payment.rental.property.type}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>${payment.rental.property.price}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>${payment.price}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>${payment.rental.property.price - payment.price}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex justify-end gap-3">
                      <UpdatePayment id={payment.id.toString()} />
                      <ProfilePayment id={payment.id.toString()} />
                      <DeletePayment id={payment.id.toString()} />
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

export default Payments;
