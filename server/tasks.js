const { pool } = require("./db/pool");
const { MIN_RESULTS_FOR_UNLOCK } = require("./constants");
const sendSurveyUnlockedEmail = require("./communication/survey-unlocked-email");

async function getUnlockedSurveys() {
  const query = `SELECT s.id, s.owner_email FROM surveys s, responses r WHERE r.survey_id = s.id AND s.owner_notified = 'f' GROUP BY s.id HAVING COUNT(s.id) >= ${MIN_RESULTS_FOR_UNLOCK}`;
  const res = await pool.query(query);
  return res.rows;
}

async function getResponsesFromSurvey(surveyId) {
  const query = `SELECT id, email FROM responses r WHERE survey_id = $1 AND email IS NOT NULL`;
  const res = await pool.query(query, [surveyId]);
  return res.rows;
}

async function setSurveyToNotified(surveyId) {
  const query = "UPDATE surveys SET owner_notified = 't' where id = $1";
  return pool.query(query, [surveyId]);
}

async function setResponseToNotified(responseId) {
  const query = "UPDATE responses SET user_notified = 't' where id = $1";
  return pool.query(query, [responseId]);
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

async function resultsUnlockedTask() {
  const surveys = await getUnlockedSurveys();
  console.log(`${surveys.length} surveys are unlocked`);
  return Promise.all(
    surveys.map(async result => {
      const surveyId = result.id;
      const surveyUrl = `${process.env.BASE_URL}/surveys/${surveyId}`;
      console.log(
        `Survey ${surveyId} is unlocked, informing owner and respondents ...`
      );
      await sendSurveyUnlockedEmail({
        toEmail: result.owner_email,
        surveyUrl
      });
      await setSurveyToNotified(surveyId);
      console.log(`Owner informed for survey ${surveyId}`);

      const surveyResponses = await getResponsesFromSurvey(surveyId);
      const respondents = [];
      console.log(`Informing ${surveyResponses.length} respondents ...`);
      await Promise.all(
        surveyResponses.map(async surveyResponse => {
          if (respondents.includes(surveyResponse.email)) {
            console.log(
              `Already sent an email to ${surveyResponse.email}, skipping ...`
            );
          } else {
            respondents.push(surveyResponse.email);
            await sendSurveyUnlockedEmail({
              toEmail: surveyResponse.email,
              surveyUrl
            });
          }
          await setResponseToNotified(surveyResponse.id);
        })
      );
      console.log(`Respondents informed for survey ${surveyId}`);
    })
  );
}

const ONE_MINUTE = 60 * 1000;

module.exports.initTasks = () => {
  setInterval(resultsUnlockedTask, ONE_MINUTE);
};
