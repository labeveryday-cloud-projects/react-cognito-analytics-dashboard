import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ signOut, user }) {
  const navigate = useNavigate();
  

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      console.log('Signed out successfully');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.username}!</h1>
          <nav>
            <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Sign Out
            </button>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 bg-white bg-opacity-80 p-6">
              <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
              <p className="mb-4">This is your personal dashboard. Here you can view and manage your account information.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold mb-2">Recent Activity</h3>
                  <p>No recent activity to display.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold mb-2">Quick Actions</h3>
                  <ul>
                    <li><a href="/profile" className="text-blue-600 hover:text-blue-800">Edit Profile</a></li>
                    <li><a href="/home" className="text-blue-600 hover:text-blue-800">Change Password</a></li>
                    <li><a href="/home" className="text-blue-600 hover:text-blue-800">Manage Notifications</a></li>
                    <li><a href="/analytics" className="text-blue-600 hover:text-blue-800">Get analytics</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;