import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import { getCurrentUser, signOut as amplifySignOut } from '@aws-amplify/auth';
import awsconfig from './aws-exports';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserAnalytics from './components/UserAnalytics';

Amplify.configure(awsconfig, {
  API: {
    REST: {
      headers: async () => {
        try {
          const session = await fetchAuthSession();
          const token = session.tokens?.idToken?.toString();
          return {
            Authorization: `Bearer ${token}`
          };
        } catch (error) {
          console.error('Error fetching auth session:', error);
          return {};
        }
      }
    }
  }
});

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      const currentUser = await getCurrentUser();
      setIsAuthenticated(true);
      setUser(currentUser);
    } catch (error) {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/Login" />;
  }

  const signOut = async () => {
    try {
      await amplifySignOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return React.cloneElement(children, { signOut, user });
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <UserAnalytics />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;