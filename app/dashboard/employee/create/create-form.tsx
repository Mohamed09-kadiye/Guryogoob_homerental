// Import necessary components and libraries
"use client";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateEmployee() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [tell, setTell] = useState("");
  const [address, setAddress] = useState("");
  // Add status state

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
const res ="1"
    // try {
    //   const res = await fetch("http://localhost:8080/api/employees/", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       name,
    //       address,
    //       tell,
    //       // Remove status if not needed in the form
    //       // status,
    //     }),
    //   });

      if (!res) {
        throw new Error("Failed to create employee");
      }

      // If successful, refresh and navigate
      router.refresh();
      router.push("/employees/");
    // } catch (error) {
    //   console.error("Error creating employee:", error);
    // }
  };

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="">
        <form onSubmit={sendForm}>
          {/* Employee Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Enter Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Meymuun"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Employee Telephone */}
          <div className="mb-4">
            <label htmlFor="tel" className="block text-sm font-medium">
              Enter Telephone
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  type="text"
                  id="tel"
                  name="tel"
                  value={tell}
                  onChange={(e) => setTell(e.target.value)}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  placeholder="555-1234"
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Employee Address */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium">
              Enter Address
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  placeholder="Adaado Main St"
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Employee Status */}
          {/* Commented out for now, uncomment if needed */}
          {/* <fieldset className="mb-4">
            <legend className="block text-sm font-medium">Employee Status</legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="active"
                    name="status"
                    value="active"
                    checked={status === 'active'}
                    onChange={() => setStatus('active')}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="active"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    Active
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="inactive"
                    name="status"
                    value="inactive"
                    checked={status === 'inactive'}
                    onChange={() => setStatus('inactive')}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="inactive"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    Inactive
                  </label>
                </div>
              </div>
            </div>
          </fieldset> */}

          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/invoices"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit">Create Invoice</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
