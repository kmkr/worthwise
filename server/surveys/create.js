const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const CREATE_QUERY = "INSERT INTO surveys(owner_email) VALUES($1) RETURNING *";
module.exports = ({ ownerEmail }) =>
  new Promise((resolve, reject) => {
    console.log(`Creating survey for ${ownerEmail}`);
    client.connect();
    client.query(CREATE_QUERY, [ownerEmail], (err, res) => {
      client.end();
      if (err) {
        return reject(err);
      }
      const result = res.rows[0];
      console.log(`Created survey ${result.id} for ${ownerEmail}`);
      return resolve(result);
    });
  });
