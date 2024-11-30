const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ownerRoutes = require('../backend/Routes/ownerRoutes'); // Import your routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Configuration
app.use(cors({
  origin: 'http://localhost:3000', // Specify the frontend URL for development
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// To handle JSON payloads
app.use(bodyParser.json()); 

// Optionally handle preflight requests (OPTIONS)
app.options('*', cors());

// API Routes
app.use('/api/owners', ownerRoutes); // Prefix for owner-related routes
app.use('/api/pgmgmt', ownerRoutes);
// Root Route for Testing
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
