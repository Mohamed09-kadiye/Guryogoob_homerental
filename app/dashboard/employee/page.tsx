'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import { Updateemployee, Deleteemployee, CreateEmployee } from '@/app/dashboard/employee/buttons';

import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

// Define an interface for the employee object
interface EmployeesProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

interface Employee {
  id: number;
  name: string;
  address: string;
  tell: string;
}

async function getEmployees(query: string): Promise<Employee[]> {
  const res = await fetch(`http://localhost:8080/api/employees?query=${query}`);
  if (!res.ok) {
    console.log('No Data');
  }
  return res.json();
}

function Employees({ searchParams }: EmployeesProps) {
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const query = searchParams?.query || '';

  useEffect(() => {
    const fetchEmployees = async () => {
      const employees = await getEmployees(query);
      setFilteredEmployees(employees);
    };

    fetchEmployees();
  }, [query]);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Employees</h1>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search invoices..." />
            <CreateEmployee />
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
                  Employee Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Address
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Telephone
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredEmployees.map((employee: Employee) => (
                <tr
                  key={employee.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{employee.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{employee.address}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{employee.tell}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* Replace with your status component */}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <Updateemployee id={employee.id.toString()} />
                      <Deleteemployee id={employee.id.toString()} />
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

export default Employees;
