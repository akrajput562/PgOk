const express = require('express');
const router = express.Router();
const ownerController = require('../Controller/ownerController');
const authenticate = require('../middleware/authenticate');
const pgController = require('../Controller/pgController')
// Protected route
router.get('/dashboard', authenticate, (req, res) => {
  res.send('This is a protected route.');
});

router.post('/register', ownerController.registerOwner);
router.post('/login', ownerController.login);

module.exports = router;
