const db = require('../Config/db'); // Import the database connection
require('dotenv').config();

const PgController = {
  async savePgDetails(req, res) {
    const { pg_name, pg_address, pg_contact } = req.body;

    // Validate input fields
    if (!pg_name || !pg_address || !pg_contact) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      // Perform the database operation
      const [rows] = await db.execute(
        'INSERT INTO mstpgdtl (pg_name, pg_address, pg_contact) VALUES (?, ?, ?)',
        [pg_name, pg_address, pg_contact]
      );

      // Respond with success
      res.status(201).json({
        message: 'PG details saved successfully',
        data: { id: rows.insertId, pg_name, pg_address, pg_contact },
      });
    } catch (error) {
      // Handle errors
      console.error('Error saving PG details:', error.message);
      res.status(500).json({ error: 'Failed to save PG details. Please try again later.' });
    }
  },
  getPgList: async (req, res) => {
    const query = 'SELECT * FROM mstpgdtl'; // Your query to get PG details
    
    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching PG list:', err);
        return res.status(500).json({ message: 'Database error. Failed to fetch PG list.' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ message: 'No PG details found' });
      }

      // Send the results as a JSON response
      res.status(200).json(results);
    });
  }
};




module.exports = PgController;
