import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Common/header';
import Dashboard from './components/Dashboard/dashboard';
import Sidebar from './components/Common/sidebar';
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import AboutPage from './pages/AboutPage';
import Home from './pages/tenantDashboard';
import PgManagementForm from './pages/Pgmanagement/pgManagement';
import FloorDetailsForm from './pages/Pgmanagement/floorDtls';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'tenant' | 'owner' | undefined>(undefined);
  const [loading, setLoading] = useState(true); // New loading state

  // Check for authentication data in localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role as 'tenant' | 'owner');
    }
    setLoading(false); // Authentication check complete
  }, []);

  const handleLogin = (role: 'tenant' | 'owner', token: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(undefined);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  };

  if (loading) {
    // Display a loading spinner or placeholder while authentication is being checked
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        {/* Top Header - Always visible */}
        <Header userRole={userRole} onLogout={handleLogout} />

        <div className="main-layout">
          {/* Left Sidebar - Visible only when authenticated */}
          {isAuthenticated && <Sidebar />}

          <main className="content">
            <Routes>
              {/* Public Routes */}
              {/* Public Routes */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/tenantDashboard" element={<Home />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/registeration" element={<Register />} />

              {/* Authenticated Routes */}
              {isAuthenticated ? (
                <>
                  {/* Dashboard route accessible only for owner */}
                  {userRole === 'owner' ? (
                    <><Route
                      path="/dashboard"
                      element={<Dashboard
                        ownerData={{
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
                          roomRequests: 0,
                        }} />} /><Route path="/add-properties" element={<PgManagementForm />} />
                        <Route path="/add-floor" element={<FloorDetailsForm />} />
</>
                  ) : (
                    // Redirect to login if the role is not 'owner'
                    <Route path="/dashboard" element={<Navigate to="/login" replace />} />
                   
                  )}
                </>
              ) : (
                // Redirect to login page if not authenticated
                <Route path="*" element={<Navigate to="/tenantDashboard" replace />} />
              )}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
