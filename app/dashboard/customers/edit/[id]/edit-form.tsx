// components/dashboard/customers/edit/[id]/edit-form.tsx
'use client';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface CustomerDetails {
  id: number;
  fullName: string;
  gender: string;
  username: string;
  password: string;
  email: string;
  address: string;
}

interface EditFormProps {
  customerId: string;
}

const EditForm: React.FC<EditFormProps> = ({ customerId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const res = await fetch(`http://localhost:9092/api/customers/${customerId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch customer details');
        }

        const customerData: CustomerDetails = await res.json();
        setFullName(customerData.fullName);
        setUsername(customerData.username);
        setPassword(customerData.password);
        setEmail(customerData.email);
        setAddress(customerData.address);
        setGender(customerData.gender);


        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchCustomerDetails();
  }, [customerId]);

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:9092/api/customers/${customerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          username,
          password,
          email,
          address,
          gender,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update customer');
      }

      // If successful, navigate to the customers page
      router.replace('/dashboard/customers');
    } catch (error) {
      console.error('Error updating customer:', error);
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
                placeholder="Mohamed AbdiNor Mohamed"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
  
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              Enter Username
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  placeholder="Moha123"
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>
  
          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Enter Password
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  placeholder="********"
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>
  
         
            {/* Address */}
            <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Enter Address
                    </label>
                    <div className="relative mt-2 rounded-md">
                      <div className="relative">
                        <input
                          type="Address"
                          id="Address"
                          name="Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                          placeholder="Address"
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                      </div>
                    </div>
                  </div>
 
    {/* Gender */}
    <div className="mb-4">
      <label htmlFor="gender" className="block text-sm font-medium">
        Select Gender
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder:text-gray-500"
          >
            <option value="" disabled>
              -- Select Gender --
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
      </div>
    </div>



          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/users"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit">Update User</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;

 