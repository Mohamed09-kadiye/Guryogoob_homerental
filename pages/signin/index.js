import AuthForm from '../components/AuthForm'; // Adjust the import path based on your project structure
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function index() {
    const [currentForm, setCurrentForm] = useState(null);

  const showSignInForm = () => {
    setCurrentForm('signIn');
  };

  const showSignUpForm = () => {
    setCurrentForm('signUp');
  };
  const router = useRouter();

  // ... (previous code)

  const navigateToSignIn = (e) => {
    e.preventDefault();
    showSignInForm();
    router.push('/signin'); // Navigate to the /signin page
  };

  const navigateToSignUp = (e) => {
    e.preventDefault();
    showSignUpForm();
  };

  return (
    <div>index
                <AuthForm formType={currentForm} />

    </div>
    
  )
}
