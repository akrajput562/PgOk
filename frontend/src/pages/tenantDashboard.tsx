import React, { useState, useRef } from 'react';

import { FaFilter } from 'react-icons/fa'; // Import filter icon
import { FaBuilding } from 'react-icons/fa'; // Example logo icon
import Logo from '../Assets/img/logo.jpeg'
import Header from '../components/Common/header';

const Home: React.FC = () => {
    const [showFilters, setShowFilters] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
            setShowFilters(false);
        }
    };

    return (
        <div className="bg-[#f5efde] text-black min-h-screen mt-[-70px] pt-32 relative">
            {/* Intro Section */}
            <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                    <img src={Logo} className='h-20' alt="" />
                    <h1 className="text-2xl font-bold">PgOk</h1>
                </div>
                <p className="text-lg italic">
                    "Finding your perfect PG just got easier. Experience convenience, comfort, and community."
                </p>
            </div>

            {/* Search Bar with Filter Button */}
            <div className="flex items-center justify-center mb-4 space-x-2">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-orange-200 text-black py-2 px-4 lg:w-[20%] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {/* <button
                    onClick={toggleFilters}
                    className="bg-orange-200 text-black py-2 px-4 rounded-lg flex items-center space-x-1" // Add flex for icon alignment
                >
                    <FaFilter /> 
                    <span>Filter</span>
                </button> */}
            </div>

            {/* Filter Overlay */}
            {showFilters && (
                <div
                    className="fixed inset-0 bg-opacity-50 flex items-center mt-[-70px] pt-40 justify-center z-20"
                    onClick={handleClickOutside}
                >
                    <div
                        ref={overlayRef}
                        className="w-full max-w-md mx-auto rounded-lg relative"
                        onClick={(e) => e.stopPropagation()} // Stop click events from propagating to the overlay
                    >
                        <Header />
                    </div>
                </div>
            )}

            {/* Main Content */}
            {/* <PGListings /> */}
        </div>
    );
};

export default Home;
