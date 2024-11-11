const db = require('../Model/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerOwner = async (req, res) => {
  const { ownerName, ownerEmail, ownerPhone, ownerPassword, propertyName, propertyLocation } = req.body;

  if (!ownerName || !ownerEmail || !ownerPhone || !ownerPassword || !propertyName || !propertyLocation) {
    return res.status(400).json({ message: 'Please fill all the fields' });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(ownerPassword, saltRounds);
  const query = 'INSERT INTO owners (ownerName, ownerEmail, ownerPhone, ownerPassword, propertyName, propertyLocation) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [ownerName, ownerEmail, ownerPhone, hashedPassword, propertyName, propertyLocation];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting owner:', err);
      return res.status(500).json({ message: 'Something went wrong!' });
    }

    res.status(201).json({
      message: 'Owner registered successfully!',
      ownerId: result.insertId,
    });
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter both email and password' });
  }

  const query = 'SELECT * FROM owners WHERE ownerEmail = ?';
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.ownerPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.ownerEmail },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  });
};

module.exports = { registerOwner, login };
