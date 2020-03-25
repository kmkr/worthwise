const { pool } = require("../db/pool");

const CREATE_QUERY = "INSERT INTO surveys(owner_email) VALUES($1) RETURNING *";
module.exports = async ({ ownerEmail }) => {
  console.log(`Creating survey for ${ownerEmail}`);
  const results = await pool.query(CREATE_QUERY, [ownerEmail]);
  const result = results.rows[0];
  console.log(`Created survey ${result.id} for ${ownerEmail}`);
  return result;
};
