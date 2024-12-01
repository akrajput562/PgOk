const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ownerRoutes = require('../backend/Routes/ownerRoutes'); // Owner-related routes
const pgMgmtRoutes = require('../backend/Routes/pgMgmtRoutes'); // PG management routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());

// Routes
app.use('/api/owners', ownerRoutes);
app.use('/api/pgmgmt', pgMgmtRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
