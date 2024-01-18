// pages/customer/signin/index.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';

const SignIn = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
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
  
    try {
      const response = await fetch('http://localhost:9092/api/customers/');
      const data = await response.json();
  
      console.log('Response:', response);
      console.log('Data:', data);
  
      const user = data.find((userData) => userData.username === formData.username);
  
      console.log('User:', user);
  
      if (user) {
        console.log('Stored Password:', user.password);
        console.log('Entered Password:', formData.password);
  
        const storedPassword = String(user.password); // Convert the stored password to a string
  
        if (storedPassword === formData.password) {
          // Authentication successful
          console.log('Authentication successful');
          sessionStorage.setItem('customerId', user.id);
          sessionStorage.setItem('customerUsername', user.username);
          router.push('/home');
        } else {
          // Incorrect password
          console.error('Incorrect password');
        }
      } else {
        // User not found
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">Sign In</h1>

        <form onSubmit={handleSubmit}>
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
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
