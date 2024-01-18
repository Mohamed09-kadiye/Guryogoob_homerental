// layout.js

import './globals.css';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};


const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-opacity-80 backdrop-blur-md">
      <div className="flex items-center">
        <h1 className="text-blue-500 text-4xl font-bold">Soomaal</h1>
      </div>
      <div className="flex items-center space-x-4">
        <a
          href="/home"
          className="text-black hover:text-blue-500 focus:text-blue-500 active:text-blue-500"
        >
          Home
        </a>
        <a
          href="#"
          className="text-black hover:text-blue-500 focus:text-blue-500 active:text-blue-500"
        >
          Services
        </a>
        <a
          href="#"
          className="text-black hover:text-blue-500 focus:text-blue-500 active:text-blue-500"
        >
          Contact
        </a>
        <a
          href="#"
          className="text-black hover:text-blue-500 focus:text-blue-500 active:text-blue-500"
        >
          Branches
        </a>
        <a
          href="#"
          className="text-black hover:text-blue-500 focus:text-blue-500 active:text-blue-500"
        >
          About
        </a>
      </div>
      <div className="flex items-center space-x-0 ml-4">
        <a
          href="#"
          className="text-black hover:bg-gray-200 px-4 py-2 rounded transition"
        >
          Sign In
        </a>
        <a
          href="#"
          className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded transition"
        >
          Sign Up
        </a>
      </div>
    </nav>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fontsource/inter/latin.css"
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}