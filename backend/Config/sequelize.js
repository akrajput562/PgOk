// sequelize.js (or sequelize.ts if you're using TypeScript)
import { Sequelize } from 'sequelize';  // Use import

// Set up Sequelize instance
const sequelize = new Sequelize('PGMS', 'root', 'Akrajput562!', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // You can enable logging if you want to see the SQL queries
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  export default sequelize;
