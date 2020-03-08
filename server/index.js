require("dotenv").config();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const createSurvey = require("./surveys/create");
const createResponse = require("./responses/create");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/dist", express.static(path.resolve(__dirname, "..", "dist")));

app.post("/surveys", async (req, res) => {
  const ownerEmail = req.body.email;
  try {
    const result = await createSurvey({
      ownerEmail
    });

    return res.redirect(`/surveys/${result.id}/responses/new`);
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
app.listen(port, () => console.log(`App listening on port ${port}!`));
