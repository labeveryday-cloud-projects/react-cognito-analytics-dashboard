import React, { useState, useEffect } from 'react';
import { getCurrentUser, fetchUserAttributes, signOut } from '@aws-amplify/auth';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      const userAttributes = await fetchUserAttributes(userData);
      setEmail(userAttributes.email);
    } catch (error) {
      console.log('Error fetching user data: ', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <p className="text-white text-2xl">Loading...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <nav>
            <Link to="/home" className="text-blue-600 hover:text-blue-800 mr-4">Home</Link>
            <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Sign Out
            </button>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-auto bg-white bg-opacity-80 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Your account details are displayed below.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                          <input type="text" name="username" id="username" value={user?.username || ''} readOnly className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100" />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                          <input type="text" name="email" id="email" value={email} readOnly className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;