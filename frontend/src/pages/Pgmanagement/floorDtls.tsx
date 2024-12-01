import React, { useState, useEffect } from 'react';
import { getPgList, saveFloorDetails } from '../../services/pgManagementService';
import './floorDtls.css';

const FloorDetailsForm: React.FC = () => {
  const [pgList, setPgList] = useState<{ pg_id: string; pg_name: string }[]>([]);
  const [selectedPgId, setSelectedPgId] = useState('');
  const [floorName, setFloorName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchPgList = async () => {
      try {
        const data = await getPgList();
        // setPgList(data);
        
      } catch (err) {
        console.error('Error fetching PG list:', err);
        setError('Failed to load PG list. Please try again later.');
      }
    };

    fetchPgList();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPgId || !floorName) {
      setError('Both fields are required.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await saveFloorDetails({ pg_id: selectedPgId, floor_name: floorName });
      setSuccess('Floor details saved successfully!');
      setFloorName('');
      setSelectedPgId('');
    } catch (err) {
      console.error('Error saving floor details:', err);
      setError('Failed to save floor details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Save Floor Details</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit} className="floor-form">
        <div className="form-group">
          <label htmlFor="pgSelect">Select PG</label>
          <select
            id="pgSelect"
            value={selectedPgId}
            onChange={(e) => setSelectedPgId(e.target.value)}
          >
            <option value="">-- Select PG --</option>
            {pgList.map((pg) => (
              <option key={pg.pg_id} value={pg.pg_id}>
                {pg.pg_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="floorName">Floor Name</label>
          <input
            id="floorName"
            type="text"
            value={floorName}
            onChange={(e) => setFloorName(e.target.value)}
            placeholder="Enter floor name"
          />
        </div>
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Floor'}
        </button>
      </form>
    </div>
  );
};

export default FloorDetailsForm;
