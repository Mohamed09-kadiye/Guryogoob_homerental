// Import necessary dependencies and components

'use client';
import React, { useState, useEffect } from 'react';

import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/dashboard/users/search';
import { lusitana } from '@/app/ui/fonts';
import { Updatecustomer, DeleteCustomer, Createcustomer } from '@/app/dashboard/customers/buttons';

interface CustomersProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

interface Customer {
  id: number;
  fullName: string;
  address: string;
  gender: string;
  username: string;
  password: string;
}

// Define your async function to fetch customers
async function getCustomers(query: string): Promise<Customer[]> {
  try {
    const res = await fetch(`http://localhost:9092/api/customers/?query=${query}`);
    if (!res.ok) {
      console.error('Failed to fetch customers:', res.status, res.statusText);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
}

function Customers({ searchParams }: CustomersProps) {
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const query = searchParams?.query || '';

  useEffect(() => {
    console.log('Fetching customers with query:', query);

    const fetchCustomers = async () => {
      let customers;

      // If the query is empty, fetch all customers or set filteredCustomers to your full customer list
      if (query === '') {
        console.log('Fetching all customers or set filteredCustomers to the full customer list');
        // Replace the line below with the logic to fetch all customers or set filteredCustomers to the full customer list
        customers = await getCustomers('');
      } else {
        // Fetch customers based on the query
        customers = await getCustomers(query);
      }

      // Filter customers based on the query
      const filteredCustomers = customers.filter((customer) =>
        Object.values(customer).some((value) => {
          // Check if the value is not null or undefined before calling toString
          if (value != null && value.toString) {
            return value.toString().toLowerCase().includes(query.toLowerCase());
          }
          return false;
        })
      );

      console.log('Filtered customers:', filteredCustomers);
      setFilteredCustomers(filteredCustomers);
    };

    fetchCustomers();
  }, [query]);

  // Return your JSX for the Customers page
  // ...

// Return your JSX for the Customers page
return (
  <div className="mt-6 flow-root">
    <div className="inline-block min-w-full align-middle">
    <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Customer lists</h1>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search users..." />
            <Createcustomer />
          </div>
          <div className="mt-5 flex w-full justify-center">
            {/* <Pagination totalPages={totalPages} /> */}
          </div>
        </div>
      <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
        <table className="min-w-full text-gray-900 md:table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                Full Name
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Address
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Gender
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Username
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Password
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredCustomers.map((customer: Customer) => (
              <tr
                key={customer.id}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <p>{customer.fullName}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <p>{customer.address}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <p>{customer.gender}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <p>{customer.username}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <p>{customer.password}</p>
                  </div>
                </td>
                {/* Similar to the Users page, you can add more columns as needed */}
                <td className="whitespace-nowrap px-3 py-3">
                  {/* Replace with your status component */}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <Updatecustomer id={customer.id.toString()} />
                      <DeleteCustomer id={customer.id.toString()} />
                    </div>
                  </td>
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



export default Customers;
