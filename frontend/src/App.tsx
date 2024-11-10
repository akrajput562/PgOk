import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Common/header';
import Dashboard from './components/Dashboard/dashboard';
import Sidebar from './components/Common/sidebar';
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import HomePage from './pages/homePage';
import AboutPage from './pages/AboutPage';

function App() {
  // Hardcode the authentication state for testing
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Simulate that the user is logged in
  const [userRole, setUserRole] = useState<'tenant' | 'owner'>('owner'); // Hardcode the user role to 'owner'

  // You can also log the role to verify it's being set correctly
  console.log('User Role:', userRole);
  console.log('Authenticated:', isAuthenticated);

  return (
    <Router>
      <div className="app-container">
        {/* Top Header - Always visible */}
        <Header userRole={userRole} />

        <div className="main-layout">
          {/* Left Sidebar - Always visible */}
          {isAuthenticated && <Sidebar />}

          <main className="content">
            <Routes>
              {/* Public Routes (Available without authentication) */}
              <Route path="/login" element={<Login />} />
              <Route path="/registeration" element={<Register />} />

              {/* Authenticated Routes */}
              {isAuthenticated ? (
                <>
                  {/* If authenticated, go to Dashboard */}
                  <Route path="/dashboard" element={<Dashboard ownerData={{
                    propertiesOwned: 0,
                    earnings: '',
                    rentDue: '',
                    unpaidRent: '',
                    totalGuests: 0,
                    availableRooms: 0,
                    availableRoomNames: [],
                    occupancyRate: '',
                    maintenanceRequests: 0,
                    lastPaymentDate: '',
                    roomRequests: 0
                  }} />} />
                </>
              ) : (
                // Redirect to home page if not authenticated
                <Route path="/" element={<HomePage />} />
              )}

              {/* Other Routes */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
