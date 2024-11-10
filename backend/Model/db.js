const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // replace with your MySQL username
  password: 'Akrajput562!',  // replace with your MySQL password
  database: 'PGMS'  // your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('error connecting to the database:', err.stack);
    return;
  }
  console.log('connected to the database');
});

module.exports = db;