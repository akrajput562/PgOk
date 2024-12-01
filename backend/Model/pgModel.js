
const db = require('../Config/db');
const PgModel = {
    async create(pgDetails) {
      const { pg_name, pg_address, pg_contact } = pgDetails;
      const [rows] = await db.execute(
        'INSERT INTO mstpgdtl (pg_name, pg_address, pg_contact) VALUES (?, ?, ?)',
        [pg_name, pg_address, pg_contact]
      );
      return rows;
    },
  };
  
  module.exports = PgModel;