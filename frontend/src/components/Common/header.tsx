import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../App.css';

interface NavbarProps {
    userRole: 'tenant' | 'owner';
}

const Navbar: React.FC<NavbarProps> = ({ userRole }) => {
    const [navOpen, setNavOpen] = useState(false);

    const toggleNav = () => setNavOpen(!navOpen);

    return (
        <nav className="navbar w-[83%]  ml-[16%] rounded-3xl shadow-md backdrop-blur-md bg-black/90 text-white sticky shadow-white/30 top-5 z-50">
            <div className="container p-4 flex justify-between items-center h-16">
                {/* Logo */}
                <div className="text-2xl font-bold">PgOk</div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                  
                    {userRole === 'tenant' ? (
                        <>
                            <Link to="/" className="hover:text-gray-400">Home</Link>
                            <Link to="/listings" className="hover:text-gray-400">Listings</Link>
                            <Link to="/profile" className="hover:text-gray-400">Profile</Link>
                            <Link to="/registeration" className="hover:text-gray-400">Registration</Link>
                            <Link to="/login" className="hover:text-gray-400">Login</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/owner" className="hover:text-gray-400">Dashboard</Link>
                            <Link to="/rents" className="hover:text-gray-400">Rents</Link>
                            <Link to="/pg-details" className="hover:text-gray-400">PG Details</Link>
                            <Link to="/owner-profile" className="hover:text-gray-400">Profile</Link>
                          
                        
                        </>
                    )}
                </div>

                {/* Hamburger Menu Icon */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleNav} className="focus:outline-none text-white">
                        {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {navOpen && (
                <div className="absolute left-0 right-0 bg-black/80 rounded-2xl text-white px-4 pt-2 pb-4 space-y-4 transition-all duration-300 ease-in-out">
                    {userRole === 'tenant' ? (
                        <>
                            <Link to="/" onClick={toggleNav} className="block hover:text-gray-400">Home</Link>
                            <Link to="/listings" onClick={toggleNav} className="block hover:text-gray-400">Listings</Link>
                            <Link to="/profile" onClick={toggleNav} className="block hover:text-gray-400">Profile</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/owner" onClick={toggleNav} className="block hover:text-gray-400">Dashboard</Link>
                            <Link to="/rents" onClick={toggleNav} className="block hover:text-gray-400">Rents</Link>
                            <Link to="/pg-details" onClick={toggleNav} className="block hover:text-gray-400">PG Details</Link>
                            <Link to="/owner-profile" onClick={toggleNav} className="block hover:text-gray-400">Profile</Link>
                           
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
