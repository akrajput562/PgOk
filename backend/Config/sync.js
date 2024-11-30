// sync.js
const sequelize = require('./sequelize');
const PgDetails = require('../Model/pgDetailsModel');

sequelize.sync()
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((error) => {
    console.error('Error syncing models:', error);
  });
