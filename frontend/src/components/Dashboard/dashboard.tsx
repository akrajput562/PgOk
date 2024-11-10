import React from 'react';
import { FaBed, FaDollarSign, FaRegClock, FaUsers, FaTools, FaCalendarAlt, FaBuilding } from 'react-icons/fa';

interface OwnerDataProps {
    ownerData: {
        propertiesOwned: number;
        earnings: string;
        rentDue: string;
        unpaidRent: string;
        totalGuests: number;
        availableRooms: number;
        availableRoomNames: string[];
        occupancyRate: string;
        maintenanceRequests: number;
        lastPaymentDate: string;
        roomRequests: number;
    };
}

const Dashboard: React.FC<OwnerDataProps> = ({ ownerData }) => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-2xl font-semibold mb-6 text-white">Owner Dashboard</h3>
            <div className="dashboard-grid">
                {/* Properties Owned */}
                <div className="dashboard-card">
                    <FaBuilding className="icon" />
                    <div>
                        <h4 className="text-lg font-semibold text-white">Properties Owned</h4>
                        <p className="text-xl font-bold text-green-400">{ownerData.propertiesOwned}</p>
                    </div>
                </div>

                {/* Rent Due */}
                <div className="dashboard-card">
                    <FaDollarSign className="icon" />
                    <div>
                        <h4 className="text-lg font-semibold text-white">Earnings</h4>
                        <p className="text-xl font-bold text-green-400">{ownerData.earnings}</p>
                    </div>
                </div>

                {/* Total Guests */}
                <div className="dashboard-card">
                    <FaUsers className="icon" />
                    <div>
                        <h4 className="text-lg font-semibold text-white">Total Guests</h4>
                        <p className="text-xl font-bold text-blue-400">{ownerData.totalGuests}</p>
                    </div>
                </div>

                {/* Available Rooms */}
                <div className="dashboard-card">
                    <FaBed className="icon" />
                    <div>
                        <h4 className="text-lg font-semibold text-white">Available Rooms</h4>
                        <p className="text-xl font-bold text-purple-400">{ownerData.availableRooms}</p>
                        <ul className="text-white mt-2">
                            {ownerData.availableRoomNames.map((roomName, index) => (
                                <div className="room-name" key={index}>{roomName}</div>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Rent Due and Unpaid Rent */}
                <div className="dashboard-card">
                    <FaRegClock className="icon" />
                    <div>
                        <h4 className="text-lg font-semibold text-white">Rent Due</h4>
                        <p className="text-xl font-bold text-yellow-400">{ownerData.rentDue}</p>
                    </div>
                </div>
                <div className="dashboard-card">
                    <FaTools className="icon" />
                    <div>
                        <h4 className="text-lg font-semibold text-white">Unpaid Rent</h4>
                        <p className="text-xl font-bold text-red-400">{ownerData.unpaidRent}</p>
                    </div>
                </div>

                {/* Last Payment Date */}
                <div className="dashboard-card">
                    <FaCalendarAlt className="icon" />
                    <div>
                        <h4 className="text-lg font-semibold text-white">Last Payment Date</h4>
                        <p className="text-xl font-bold text-gray-300">{ownerData.lastPaymentDate}</p>
                    </div>
                </div>

                {/* Room Requests */}
                <div className="dashboard-card">
                    <FaUsers className="icon" />
                    <div>
                        <h4 className="text-lg font-semibold text-white">Room Requests</h4>
                        <p className="text-xl font-bold text-purple-400">{ownerData.roomRequests}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
