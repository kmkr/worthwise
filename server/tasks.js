const { Client } = require("pg");
const { MIN_RESULTS_FOR_UNLOCK } = require("./constants");
const sendSurveyUnlockedEmail = require("./communication/survey-unlocked-email");

async function getUnlockedSurveys() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  const query = `SELECT s.id, s.owner_email FROM surveys s, responses r WHERE r.survey_id = s.id AND s.owner_notified = 'f' GROUP BY s.id HAVING COUNT(s.id) >= ${MIN_RESULTS_FOR_UNLOCK}`;
  await client.connect();
  const res = await client.query(query);
  client.end();
  return res.rows;
}

async function updateSurvey(surveyId) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  const query = "UPDATE surveys SET owner_notified = 't' where id = $1";
  await client.connect();
  await client.query(query, [surveyId]);
  client.end();
}

async function resultsUnlockedTask() {
  const surveys = await getUnlockedSurveys();
  console.log(`${surveys.length} surveys are unlocked`);
  return Promise.all(
    surveys.map(async result => {
      const surveyId = result.id;
      console.log(`Survey ${surveyId} is unlocked, informing owner`);
      await sendSurveyUnlockedEmail({
        toEmail: result.owner_email,
        surveyUrl: `/surveys/${surveyId}`
      });
      await updateSurvey(surveyId);
      console.log(`Owner informed for survey ${surveyId}`);
      // todo: inform respondees
    })
  );
}

const ONE_MINUTE = 60 * 1000;

module.exports.initTasks = () => {
  setInterval(resultsUnlockedTask, ONE_MINUTE);
};
