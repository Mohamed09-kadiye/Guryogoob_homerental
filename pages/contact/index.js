import React from 'react';
import Layout from '../components/layout';
import Navbar from '../components/Navbar';

const ContactPage = () => {
  return (
    <Layout>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center p-24">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          <p className="text-gray-600 mb-8">
            Have a question or inquiry? Get in touch with us using the form
            below, or reach out to us through the provided contact information.
          </p>

          <form className="mb-8">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-bold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded transition"
            >
              Submit
            </button>
          </form>

          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-2">
              Email: info@brainstorm.com
            </p>
            <p className="text-gray-600">Phone: +1 (123) 456-7890</p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ContactPage;