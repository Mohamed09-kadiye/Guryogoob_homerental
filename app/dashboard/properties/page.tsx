// Import necessary modules and components

'use client';
import React, { useState, useEffect } from 'react';
import Search from '@/app/dashboard/users/search';
import Pagination from '@/app/ui/invoices/pagination';
import { lusitana } from '@/app/ui/fonts';
import { CreateProperty, UpdateProperty, ProfileProperty, DeleteProperty } from '@/app/dashboard/properties/buttons';
import { EyeDropperIcon, TagIcon } from '@heroicons/react/24/solid';
import { TvIcon } from '@heroicons/react/20/solid';
import { KeyIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Define an interface for the property object
interface Property {
  id: number;
  propertyName: string;
  type: string;
  description: string;
  price: number;
  roomCount: number;
  location: string;
  dateCreated: string;
  available: boolean;
  ownerId: number;
}

// Function to fetch properties from the API
async function getProperties(query: string): Promise<Property[]> {
  try {
    const res = await fetch(`http://localhost:9092/api/properties?query=${query}`);
    if (!res.ok) {
      console.error('Failed to fetch properties:', res.status, res.statusText);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

// Define the Properties component
function Properties() {
  // State variables
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const query = ''; // Initialize query as an empty string

  // useEffect to fetch properties based on the query
  useEffect(() => {
    console.log('Fetching properties with query:', query);

    // Function to fetch properties
    const fetchProperties = async () => {
      let properties;

      // If the query is empty, fetch all properties
      if (query === '') {
        properties = await getProperties('');
      } else {
        properties = await getProperties(query);
      }

      // Set filtered properties based on the query
      const filteredProperties = properties.filter((property) =>
        Object.values(property).some((value) => {
          // Check if the value is not null or undefined before calling toString
          if (value != null && value.toString) {
            return value.toString().toLowerCase().includes(query.toLowerCase());
          }
          return false;
        })
      );

      console.log('Filtered properties:', filteredProperties);
      setFilteredProperties(filteredProperties);
    };

    fetchProperties();
  }, [query]);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Properties</h1>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search properties..." />
            <CreateProperty />
          </div>
          <div className="mt-5 flex w-full justify-center">
            {/* <Pagination totalPages=Calculate total pages /> */}
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
                  Property Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Type
                </th>
               
                <th scope="col" className="px-3 py-5 font-medium">
                  Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Rooms
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Location
                </th>
               
                <th scope="col" className="px-3 py-5 font-medium">
                  Available
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Owner Id
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredProperties.map((property: Property) => (
                <tr
                  key={property.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{property.id}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{property.propertyName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{property.type}</p>
                    </div>
                  </td>
                
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{property.price}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{property.roomCount}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{property.location}</p>
                    </div>
                  </td>
                
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                        property.available ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {property.available ? (
                        <>
                          Yes
                          <KeyIcon className="ml-1 w-4 text-white" />
                        </>
                      ) : (
                        <>
                          No
                          <XMarkIcon className="ml-1 w-4 text-gray-500" />
                        </>
                      )}
                    </span>
                  </div>
                </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{property.ownerId}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex justify-end gap-3">
                      <UpdateProperty id={property.id.toString()} />
                      <ProfileProperty id={property.id.toString()} />
                      <DeleteProperty id={property.id.toString()} />
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

export default Properties;
