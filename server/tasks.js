const { pool } = require("./db/pool");
const { MIN_RESULTS_FOR_UNLOCK } = require("./constants");
const sendSurveyUnlockedEmail = require("./communication/survey-unlocked-email");

async function getUnlockedSurveys() {
  const query = `SELECT s.id, s.owner_email FROM surveys s, responses r WHERE r.survey_id = s.id AND s.owner_notified = 'f' GROUP BY s.id HAVING COUNT(s.id) >= ${MIN_RESULTS_FOR_UNLOCK}`;
  const res = await pool.query(query);
  return res.rows;
}

async function updateSurvey(surveyId) {
  const query = "UPDATE surveys SET owner_notified = 't' where id = $1";
  return pool.query(query, [surveyId]);
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
