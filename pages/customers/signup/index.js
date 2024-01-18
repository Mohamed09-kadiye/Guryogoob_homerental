// pages/customer/signup/index.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';

const SignUp = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    gender: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields here if needed

    try {
      const response = await fetch('http://localhost:9092/api/customers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          address: formData.address,
          gender: formData.gender,
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        // Redirect or handle success as needed
        router.push('/home'); // Redirect to a success page
      } else {
        // Handle error, show a message, etc.
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 p-2.5 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2.5 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 p-2.5 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2.5 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2.5 w-full border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
          >
            Register new account
          </button>
        </form>
      </div>
    </div>
  );
};



export default SignUp;
