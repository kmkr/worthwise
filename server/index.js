require("dotenv").config();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const createSurvey = require("./surveys/create");
const createResponse = require("./responses/create");
const sendSurveyCreatedEmail = require("./communication/survey-created-email");
const { initTasks } = require("./tasks");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/dist", express.static(path.resolve(__dirname, "..", "dist")));
app.engine("pug", require("pug").__express);

app.post("/surveys", async (req, res) => {
  const ownerEmail = req.body.email;
  try {
    const result = await createSurvey({
      ownerEmail
    });

    const surveyPathName = `/surveys/${result.id}/responses/new`;
    await sendSurveyCreatedEmail({
      toEmail: ownerEmail,
      surveyUrl: `${process.env.BASE_URL}${surveyPathName}`
    });
    return res.redirect(`${surveyPathName}?from=create`);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send("Oh no");
  }
});

app.post("/surveys/:surveyId/responses", async (req, res) => {
  const { surveyId, salary, email } = req.body;

  try {
    const result = await createResponse({
      surveyId,
      salary,
      email
    });

    return res.redirect(`/surveys/${surveyId}`);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send("Oh no");
  }
});

function htmlHandler(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
}

[
  "/",
  "/surveys/new",
  "/surveys/:id",
  "/surveys/:id/responses/new"
].forEach(pattern => app.get(pattern, htmlHandler));

const port = process.env.PORT;

initTasks();

app.listen(port, () => console.log(`App listening on port ${port}!`));
