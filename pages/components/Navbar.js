// pages/components/navbar.js
import React, { useState, useEffect } from 'react';
import AuthForm from './AuthForm'; // Adjust the import path based on your project structure
import { useRouter } from 'next/navigation';
import Modal from '../components/Model';
import Link from 'next/link';

const Navbar = () => {
  const router = useRouter();
  const [customerUsername, setCustomerUsername] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentForm, setCurrentForm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9092/api/properties?search=${searchQuery}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error('Error fetching data');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const renderSearchResults = () => {
    return (
      <div className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-md w-full">
        {searchResults.map((result) => (
          <div key={result.id} className="p-2 hover:bg-gray-100 cursor-pointer">
            <p>{result.propertyName}</p>
          </div>
        ))}
      </div>
    );
  };

  const handleLogout = () => {
    // Implement logout logic here
    sessionStorage.clear();
    setCustomerUsername('');
    router.push('/');
  };

  useEffect(() => {
    const username = sessionStorage.getItem('customerUsername');
    if (typeof window !== 'undefined' && username) {
      setCustomerUsername(username);
    }
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 bg-opacity-100 backdrop-blur-md">
      <div className="flex items-left">
        <a href="/" className="mr-8">
          <h1 className="text-blue-500 text-4xl font-bold" style={{ color: '#0070F3' }}>
            GuryoGoob.
          </h1>
        </a>
        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-16 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pr-6">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>

          {/* Display search results */}
          {searchQuery && renderSearchResults()}
        </div>
      </div>
      <div className="flex items-center ml-0 space-x-7">
        {/* Navigation Links */}
        <a href="/home" className="text-black hover:text-blue-500 focus:text-blue-500 active:text-blue-500">
          Home
        </a>
        <a href="/Properties" className="text-black hover:text-blue-500 focus:text-blue-500 active:text-blue-500">
          Properties
        </a>
        <a href="/contact" className="text-black hover:text-blue-500 focus:text-blue-500 active:text-blue-500">
          contact
        </a>
        <a href="/branches" className="text-black hover:text-blue-500 focus:text-blue-500 active:text-blue-500">
          Popular
        </a>
        <a href="/about" className="text-black hover:text-blue-500 focus:text-blue-500 active:text-blue-500">
          Explore
        </a>

        {/* User section */}
        {customerUsername ? (
          <div className="flex items-center space-x-2">
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* Add your user icon SVG code here */}
            </svg>
            <span className="text-blue-600">{customerUsername}</span>
            <button onClick={handleLogout} className="text-blue-600 hover:bg-blue-200 px-4 py-2 rounded transition">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-0 ml-4">
            <Link href="/customers/signin" className="text-black hover:bg-gray-200 px-4 py-2 rounded transition">
              Sign In
            </Link>

            <Link
              href="/customers/signup"
              className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded transition"
              style={{ backgroundColor: '#0070F3' }}
              >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
