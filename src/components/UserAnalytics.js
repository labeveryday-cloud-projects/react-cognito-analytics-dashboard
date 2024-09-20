import React, { useState, useEffect } from 'react';
import { get } from 'aws-amplify/api';
import { useNavigate, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchAuthSession } from 'aws-amplify/auth';


function UserAnalytics({ signOut, user }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);

      // Log the auth session
      const session = await fetchAuthSession();
      console.log('Auth session:', session);

      // Add the name of your api and the name of the resource
      const restOperation = get({ apiName: 'UPDATE-ME-my-api', path: 'UPDATE-ME-my-api-resource' });
      const { body } = await restOperation.response;
      const json = await body.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('API call failed:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      console.log('Signed out successfully');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center">
      <div className="text-white text-xl">Error: {error}</div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center">
      <div className="text-white text-xl">No data available</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
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
            <div className="border-4 border-dashed border-gray-200 rounded-lg bg-white bg-opacity-80 p-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <SummaryCard title="Total Active Users" value={data.totalActiveUsers} color="bg-blue-100" />
                <SummaryCard title="Total New Signups" value={data.totalNewSignups} color="bg-green-100" />
                <SummaryCard title="Total Page Views" value={data.totalPageViews} color="bg-yellow-100" />
                <SummaryCard title="Avg Session Duration" value={`${data.avgSessionDuration.toFixed(2)}s`} color="bg-purple-100" />
              </div>

              {/* Chart */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">User Activity Over Time</h2>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.userAnalytics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="activeUsers" fill="#3B82F6" name="Active Users" />
                      <Bar dataKey="newSignups" fill="#10B981" name="New Signups" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Data Table */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Detailed Analytics</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Users</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Signups</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page Views</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Session Duration</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.userAnalytics.map((day, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">{day.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{day.activeUsers.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{day.newSignups.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{day.pageViews.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{day.avgSessionDuration.toFixed(2)}s</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SummaryCard({ title, value, color }) {
  return (
    <div className={`${color} rounded-lg shadow-md p-6`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}

export default UserAnalytics;