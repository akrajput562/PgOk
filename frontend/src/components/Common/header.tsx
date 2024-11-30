import React from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';
interface HeaderProps {
  userRole?: 'tenant' | 'owner';
  onLogout?: () => void; // Accept onLogout as a prop
}

const Header: React.FC<HeaderProps> = ({ userRole, onLogout }) => {
  return (
    <header className="header bg-gray-900 text-white py-4 px-8 flex justify-between items-center">
      <div className="logo text-2xl font-bold">PG Management</div>
      <nav>
        <ul className="flex space-x-6">
          {/* Role-based Links */}
          {userRole === 'owner' && (
            <>
              <li>
                <Link to="/dashboard" className="hover:text-gray-400">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/pg-details" className="hover:text-gray-400">
                  PG Details
                </Link>
              </li>
              <li>
                <Link to="/rents" className="hover:text-gray-400">
                  Rents
                </Link>
              </li>
              <li>
                <Link to="/owner-profile" className="hover:text-gray-400">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={onLogout} // Call onLogout when clicked
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {userRole === 'tenant' && (
            <>
              <li>
                <Link to="/" className="hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/listings" className="hover:text-gray-400">
                  Listings
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-gray-400">
                  Profile
                </Link>
              </li>
            </>
          )}

          {/* Unauthenticated Links */}
          {!userRole && (
            <>
              <li>
                <Link to="/" className="hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-400">
                  About
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-gray-400">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
