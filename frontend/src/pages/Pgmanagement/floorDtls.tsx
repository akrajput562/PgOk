import React, { useState, useEffect } from 'react';
import { getPgList, saveFloorDetails } from '../../services/pgManagementService';
import './floorDtls.css';

interface FloorDetails {
  pg_id: string;
  floor_name: string;
}

const FloorDetailsForm: React.FC = () => {
  const [floorDetails, setFloorDetails] = useState<FloorDetails>({
    pg_id: '',
    floor_name: '',
  });
  const [pgList, setPgList] = useState<{ pg_id: string; pg_name: string }[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPgList = async () => {
      try {
        const data = await getPgList();
        const formattedData = data.map((pg: { idMstPg: string; pg_name: string }) => ({
          pg_id: pg.idMstPg,
          pg_name: pg.pg_name,
        }));
        setPgList(formattedData);
      } catch (err) {
        console.error('Error fetching PG list:', err);
        setError('Failed to load PG list. Please try again later.');
      }
    };

    fetchPgList();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFloorDetails({ ...floorDetails, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!floorDetails.pg_id || !floorDetails.floor_name) {
      setError('Both PG and floor name are required.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await saveFloorDetails(floorDetails);
      setSuccess('Floor details saved successfully!');
      setFloorDetails({ pg_id: '', floor_name: '' });
    } catch (err) {
      console.error('Error saving floor details:', err);
      setError('Failed to save floor details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Floor Details</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit} className="floor-form">
        <div className="form-group">
          <label htmlFor="pgSelect">Select PG:</label>
          <select
            id="pgSelect"
            name="pg_id"
            value={floorDetails.pg_id}
            onChange={handleChange}
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
          <label htmlFor="floorName">Floor Name:</label>
          <input
            id="floorName"
            type="text"
            name="floor_name"
            value={floorDetails.floor_name}
            onChange={handleChange}
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
