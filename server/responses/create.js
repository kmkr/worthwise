const { pool } = require("../db/pool");

const CREATE_QUERY =
  "INSERT INTO responses(survey_id, salary, email) VALUES($1, $2, $3) RETURNING *";

module.exports = async ({ surveyId, salary, email }) => {
  console.log(`Adding response to survey ${surveyId}`);
  const results = await pool.query(CREATE_QUERY, [surveyId, salary, email]);
  const result = results.rows[0];
  console.log(`Response ${result.id} added to survey ${surveyId}`);
};
