import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/Login');
  };

  const handleSignUp = () => {
    navigate('/SignUp');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <header className="p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">My Demo App</h1>
          <div>
            <button
              onClick={handleSignIn}
              className="bg-white text-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-blue-100 transition duration-300 mr-4"
            >
              Sign In
            </button>
            <button
              onClick={handleSignUp}
              className="bg-blue-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-800 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </nav>
      </header>
      <main className="container mx-auto mt-20 text-center">
        <h2 className="text-white text-5xl font-bold mb-6">Welcome to My Amazing App</h2>
        <p className="text-white text-xl mb-8">Discover the power of our application and transform your experience.</p>
        <button
          onClick={handleSignUp}
          className="bg-white text-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300"
        >
          Get Started
        </button>
      </main>
      <footer className="absolute bottom-0 w-full p-4 text-center text-white">
        <p>&copy; 2024 Your App Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;