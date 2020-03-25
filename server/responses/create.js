const { Client } = require("pg");

const CREATE_QUERY =
  "INSERT INTO responses(survey_id, salary, email) VALUES($1, $2, $3) RETURNING *";

module.exports = async ({ surveyId, salary, email }) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  console.log(`Adding response to survey ${surveyId}`);
  await client.connect();
  const results = client.query(CREATE_QUERY, [surveyId, salary, email]);
  client.end();
  const result = results.rows[0];
  console.log(`Response ${result.id} added to survey ${surveyId}`);
};
