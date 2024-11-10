
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ownerRoutes = require('../backend/Routes/ownerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Specify the frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
app.use(bodyParser.json());   // Built-in body-parser in Express


// Use the owner routes
app.use('/api/owners', ownerRoutes);

// Start server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
