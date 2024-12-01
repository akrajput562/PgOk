const PgModel = require('../Model/pgModel');

const PgService = {
  async savePgDetails(pgDetails) {
    try {
      const result = await PgModel.create(pgDetails);
      return result;
    } catch (error) {
      throw new Error('Error saving PG details');
    }
  },
};

module.exports = PgService;
