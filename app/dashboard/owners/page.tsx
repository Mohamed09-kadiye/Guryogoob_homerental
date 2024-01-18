'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/dashboard/users/search';
import { lusitana } from '@/app/ui/fonts';
import { UpdateOwner,ProfileOwner, DeleteOwner, CreateOwner} from '@/app/dashboard/owners/buttons';

import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

// Define an interface for the user object
interface UsersProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

interface Owner {
  id: number;
  fullName: string;
  address: string;
  telephoneNumber: string;
}


async function getOwners(query: string): Promise<Owner[]> {
  try {
    const res = await fetch(`http://localhost:9092/api/owners?query=${query}`);
    if (!res.ok) {
      console.error('Failed to fetch owners:', res.status, res.statusText);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching owners:', error);
    return [];
  }
}



function Owners({ searchParams }: UsersProps) {
  const [filteredOwners, setFilteredOwners] = useState<Owner[]>([]);
  const query = searchParams?.query || '';

  useEffect(() => {
    console.log('Fetching owners with query:', query);

    const fetchOwners = async () => {
      let owners;

      // If the query is empty, fetch all owners
      if (query === '') {
        owners = await getOwners('');
      } else {
        owners = await getOwners(query);
      }

      // Filter owners based on the query
      const filteredOwners = owners.filter((owner) =>
        Object.values(owner).some((value) => {
          // Check if the value is not null or undefined before calling toString
          if (value != null && value.toString) {
            return value.toString().toLowerCase().includes(query.toLowerCase());
          }
          return false;
        })
      );

      console.log('Filtered owners:', filteredOwners);
      setFilteredOwners(filteredOwners);
    };

    fetchOwners();
  }, [query]);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Owners</h1>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search owners..." />
            {/* Replace with your create owner button */}
            <CreateOwner  />
          </div>
          <div className="mt-5 flex w-full justify-center">
            {/* <Pagination totalPages={totalPages} /> */}
          </div>
        </div>
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Id
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Full Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Address
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Telephone Number
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredOwners.map((owner: Owner) => (
                <tr
                  key={owner.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{owner.id}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{owner.fullName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{owner.address}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{owner.telephoneNumber}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex justify-end gap-3">
                      <UpdateOwner id={owner.id.toString()} /> 
                      <ProfileOwner id={owner.id.toString()} />

                      <DeleteOwner id={owner.id.toString()} />
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

export default Owners;
