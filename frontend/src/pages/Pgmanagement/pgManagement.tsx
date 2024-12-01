import React, { useState } from 'react';
import axios from 'axios';
import '../Pgmanagement/PgManagement.css';
import {savePGDetails } from '../../services/pgManagementService';

interface PgDetails {
  pg_name: string;
  pg_address: string;
  pg_contact: string;
}

const PgManagement: React.FC = () => {
  const [pgDetails, setPgDetails] = useState<PgDetails>({
    pg_name: '',
    pg_address: '',
    pg_contact: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPgDetails({ ...pgDetails, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await savePGDetails(pgDetails)
      alert('PG details saved successfully!');
      setPgDetails({ pg_name: '', pg_address: '', pg_contact: '' });
    } catch (error) {
      console.error('Error saving PG details:', error);
      alert('Failed to save PG details. Please try again.');
    }
  };

  return (
    <div className="pg-management">
      <h2>Add PG Details</h2>
      <form className="pg-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">PG Name:</label>
          <input
            type="text"
            id="pg_name"
            name="pg_name"
            value={pgDetails.pg_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">PG Location:</label>
          <input
            type="text"
            id="pg_address"
            name="pg_address"
            value={pgDetails.pg_address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact Details:</label>
          <input
            type="text"
            id="pg_contact"
            name="pg_contact"
            value={pgDetails.pg_contact}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Save</button>
      </form>
    </div>
  );
};

export default PgManagement;
