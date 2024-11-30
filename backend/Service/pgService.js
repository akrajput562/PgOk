const db = require("../Model/db");

const savePGDetails = async (pgDetails, floors) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) return reject(err);

      // Insert PG details
      db.query(
        "INSERT INTO MstPgDtl (pg_name, pg_address, pg_contact) VALUES (?, ?, ?)",
        [pgDetails.pg_name, pgDetails.pg_address, pgDetails.pg_contact],
        (err, pgResult) => {
          if (err) return db.rollback(() => reject(err));

          const pgId = pgResult.insertId;

          // Insert Floors
          floors.forEach((floor, index) => {
            db.query(
              "INSERT INTO floors (pg_id, floor_name) VALUES (?, ?)",
              [pgId, floor.floorName],
              (err, floorResult) => {
                if (err) return db.rollback(() => reject(err));

                const floorId = floorResult.insertId;

                // Insert Rooms
                floor.rooms.forEach((room) => {
                  db.query(
                    "INSERT INTO rooms (floor_id, room_number, capacity) VALUES (?, ?, ?)",
                    [floorId, room.roomNumber, room.capacity],
                    (err) => {
                      if (err) return db.rollback(() => reject(err));
                    }
                  );
                });
              }
            );
          });

          db.commit((err) => {
            if (err) return db.rollback(() => reject(err));
            resolve("PG details saved successfully!");
          });
        }
      );
    });
  });
};

module.exports = {
  savePGDetails,
};
