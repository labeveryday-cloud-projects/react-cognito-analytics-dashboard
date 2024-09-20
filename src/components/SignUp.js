import React, { useState } from 'react';
import { signUp, confirmSignUp } from '@aws-amplify/auth';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      setShowConfirmation(true);
    } catch (error) {
      console.log('error signing up:', error);
      setError(error.message || 'An error occurred during sign up');
    }
  };

  const handleConfirmSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await confirmSignUp({ username, confirmationCode });
      navigate('/login');
    } catch (error) {
      console.log('error confirming sign up', error);
      setError(error.message || 'An error occurred during confirmation');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!showConfirmation ? (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-1">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
        ) : (
          <form onSubmit={handleConfirmSignUp} className="space-y-4">
            <div>
              <label htmlFor="confirmationCode" className="block mb-1">Confirmation Code</label>
              <input
                type="text"
                id="confirmationCode"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Confirm Sign Up
            </button>
          </form>
        )}
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;