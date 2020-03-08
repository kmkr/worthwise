const { Client } = require("pg");

const CREATE_QUERY =
  "INSERT INTO responses(survey_id, salary, email) VALUES($1, $2, $3) RETURNING *";
module.exports = ({ surveyId, salary, email }) =>
  new Promise((resolve, reject) => {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true
    });
    console.log(`Adding response to survey ${surveyId}`);
    client.connect();
    client.query(CREATE_QUERY, [surveyId, salary, email], (err, res) => {
      client.end();
      if (err) {
        return reject(err);
      }
      const result = res.rows[0];
      console.log(`Response ${result.id} added to survey ${surveyId}`);
      return resolve();
    });
  });
