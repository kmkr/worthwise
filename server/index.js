require("dotenv").config();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const createSurvey = require("./surveys/create");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/dist", express.static(path.resolve(__dirname, "..", "dist")));

app.post("/survey", async (req, res) => {
  const ownerEmail = req.body.email;
  try {
    const result = await createSurvey({
      ownerEmail
    });

    return res.redirect(`/surveys/${result.id}`);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send("Oh no");
  }
});

function htmlHandler(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
}

app.get("/", htmlHandler);
app.get("/surveys/new", htmlHandler);
app.get("/surveys/:id", htmlHandler);

const port = process.env.PORT;
app.listen(port, () => console.log(`App listening on port ${port}!`));
