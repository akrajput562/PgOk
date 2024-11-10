import React, { useState } from 'react';
import './PGOwnerRegister.css';
import axios from 'axios';
import { register } from '../../services/authServices';

const PGOwnerRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerEmail: '',
    ownerPassword: '',
    ownerConfirmPassword: '',
    ownerPhone: '',
    propertyName: '',
    propertyLocation: '',
  });

  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors: string[] = [];

    // Validate Email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.ownerEmail)) {
      errors.push('Please enter a valid email address.');
    }

    // Validate Password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.ownerPassword)) {
      errors.push('Password must have at least one uppercase letter, one lowercase letter, one number, and one special character.');
    }

    // Confirm Password Validation
    if (formData.ownerPassword !== formData.ownerConfirmPassword) {
      errors.push('Password and Confirm Password do not match.');
    }

    // Validate Phone Number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.ownerPhone)) {
      errors.push('Phone number should be exactly 10 digits.');
    }

    // Check if there are any validation errors
    if (errors.length > 0) {
      setErrorMessages(errors);
      return false;
    }

    // If no errors, clear any existing error messages
    setErrorMessages([]);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!validateForm()) {
      return;
    }

    try {
      console.log(formData);
      // Send POST request to your backend API
      // const response = await axios.post('http://localhost:5000/api/owners/register', formData);
      const response = await register(formData.ownerName, formData.ownerEmail, formData.ownerPassword,formData.ownerPhone,formData.propertyLocation,formData.propertyName);


      // Handle response from server (for example, a success message)
      console.log('Registration Successful:', response.data);

      // Optionally, reset the form
      setFormData({
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
        ownerPassword: '',
        ownerConfirmPassword: '',
        propertyName: '',
        propertyLocation: '',
      });
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>PG Owner Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="ownerName">Owner Name</label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ownerEmail">Email</label>
            <input
              type="email"
              id="ownerEmail"
              name="ownerEmail"
              value={formData.ownerEmail}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ownerPassword">Password</label>
            <input
              type="password"
              id="ownerPassword"
              name="ownerPassword"
              value={formData.ownerPassword}
              onChange={handleChange}
              placeholder="Enter your Password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ownerConfirmPassword">Confirm Password</label>
            <input
              type="password"
              id="ownerConfirmPassword"
              name="ownerConfirmPassword"
              value={formData.ownerConfirmPassword}
              onChange={handleChange}
              placeholder="Confirm your Password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ownerPhone">Phone Number</label>
            <input
              type="tel"
              id="ownerPhone"
              name="ownerPhone"
              value={formData.ownerPhone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="propertyName">Property Name</label>
            <input
              type="text"
              id="propertyName"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              placeholder="Enter the name of your property"
            />
          </div>

          <div className="form-group">
            <label htmlFor="propertyLocation">Property Location</label>
            <input
              type="text"
              id="propertyLocation"
              name="propertyLocation"
              value={formData.propertyLocation}
              onChange={handleChange}
              placeholder="Enter the property location"
            />
          </div>

          {/* Display error messages */}
          {errorMessages.length > 0 && (
            <div className="error-messages">
              <ul>
                {errorMessages.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <button type="submit" className="submit-btn">Register Property</button>
        </form>
      </div>
    </div>
  );
};

export default PGOwnerRegister;
