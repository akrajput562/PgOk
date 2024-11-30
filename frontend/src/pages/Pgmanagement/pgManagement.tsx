import React, { useState } from 'react';
import axios from 'axios';
import '../Pgmanagement/PgManagement.css';
import { savePGDetails } from '../../services/pgManagementService';

interface PgDetails {
  name: string;
  location: string;
  contact: string;
}

const PgManagement: React.FC = () => {
  const [pgDetails, setPgDetails] = useState<PgDetails>({
    name: '',
    location: '',
    contact: '',
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
      setPgDetails({ name: '', location: '', contact: '' });
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
            id="name"
            name="name"
            value={pgDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">PG Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={pgDetails.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact Details:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={pgDetails.contact}
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
