'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/dashboard/users/search';
import { lusitana } from '@/app/ui/fonts';
import { UpdateUser, DeleteUsers, CreateUsers } from '@/app/dashboard/users/buttons';

import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

// Define an interface for the user object
interface UsersProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

interface User {
  id: number;
  fullName: string;
  address: string;
  username: string;
  password: string;
  email: string;
}

async function getUsers(query: string): Promise<User[]> {
  try {
    const res = await fetch(`http://localhost:9092/api/users?query=${query}`);
    if (!res.ok) {
      console.error('Failed to fetch users:', res.status, res.statusText);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}


function Users({ searchParams }: UsersProps) {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const query = searchParams?.query || '';

  useEffect(() => {
    console.log('Fetching users with query:', query);
  
    const fetchUsers = async () => {
      let users;
    
      // If the query is empty, fetch all users or set filteredUsers to your full user list
      if (query === '') {
        console.log('Fetching all users or set filteredUsers to full user list');
        // Replace the line below with the logic to fetch all users or set filteredUsers to the full user list
        users = await getUsers('');
      } else {
        // Fetch users based on the query
        users = await getUsers(query);
      }
    
      // Filter users based on the query
      const filteredUsers = users.filter((user) =>
        Object.values(user).some((value) => {
          // Check if the value is not null or undefined before calling toString
          if (value != null && value.toString) {
            return value.toString().toLowerCase().includes(query.toLowerCase());
          }
          return false;
        })
      );
    
      console.log('Filtered users:', filteredUsers);
      setFilteredUsers(filteredUsers);
    };
    
  
    fetchUsers();
  }, [query]);
  

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Users</h1>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search users..." />
            <CreateUsers />
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
                  Full Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Address
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Username
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredUsers.map((user: User) => (
                <tr
                  key={user.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{user.fullName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{user.address}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{user.username}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{user.email}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* Replace with your status component */}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateUser id={user.id.toString()} />
                      <DeleteUsers id={user.id.toString()} />
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

export default Users;
