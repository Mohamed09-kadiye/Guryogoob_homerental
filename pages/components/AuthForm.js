import React, { useState } from 'react';

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = 'http://localhost:9092/api/customers/';

    if (isSignUp) {
      // Sign up
      const signUpData = {
        fullName,
        address,
        gender,
        username,
        password,
      };

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signUpData),
        });

        if (response.ok) {
          // Successful sign-up, you can handle the success here
          console.log('Sign-up successful');
        } else {
          // Handle sign-up error
          console.error('Sign-up failed');
        }
      } catch (error) {
        console.error('Error during sign-up:', error);
      }
    } else {
      // Sign in
      // Sign in
const signInData = {
  username,
  password,
};

try {
  const apiUrl = `http://localhost:9092/api/customers/?username=${username}&password=${password}`;

  // Send a GET request to check the credentials
  const response = await fetch(apiUrl);

  if (response.ok) {
    const userData = await response.json();

    // Check if the response contains user data
    if (userData.length > 0) {

      // Valid credentials, set username in session storage
      sessionStorage.setItem('username', userData[0].username);

      // Successful sign-in, you can handle the success here
      console.log('Sign-in successful');
console.log("sss:" + userData[0]);
      // Close the modal or navigate to the next page
      // window.location.reload();
    } else {
      // Invalid credentials, show SweetAlert or handle accordingly
      console.error('Invalid credentials');
      console.log('API URL:', apiUrl);
      console.log('Response:', response);

      // You can use your preferred SweetAlert library here
      alert('Invalid credentials. Please sign up.');
    }
  } else {
    // Handle the case when the server returns an error status
    console.error('Error during sign-in:', response.status);
  }
} catch (error) {
  console.error('Error during sign-in:', error);
}

    }
  };
  return (
<div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
    {isSignUp && (
      <>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fullName"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Gender
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="gender"
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
      </>
    )}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Username
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        placeholder="******************"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* You can add a password strength indicator or other messages here */}
    </div>
    <div className="flex items-center justify-between">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </button>
      <button
        className="text-blue-500 hover:text-blue-800 font-bold text-sm"
        type="button"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
      </button>
    </div>
  </form>
  </div>
  );
};

export default AuthForm;
