import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
    <h2 className="sidebar-title">PG Admin</h2>
    <ul className="sidebar-menu">
      <li>
        <NavLink to="/dashboard" >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/listings" >
          Listings
        </NavLink>
      </li>
      <li>
        <NavLink to="/bookings" >
          Bookings
        </NavLink>
      </li>
      <li>
        <NavLink to="/tenants" >
          Tenants
        </NavLink>
      </li>
      <li>
        <NavLink to="/settings" >
          Settings
        </NavLink>
      </li>
    </ul>
  </div>
  );
  };
  
  export default Sidebar;