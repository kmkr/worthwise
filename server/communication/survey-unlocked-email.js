const path = require("path");
const pug = require("pug");

const mailWrapper = require("./mail-wrapper");

const template = pug.compileFile(
  path.resolve(__dirname, "..", "surveys", "survey-unlocked.pug")
);

module.exports = ({ toEmail, surveyUrl }) => {
  const title = "🤘 Survey results ready";
  const templateData = {
    title,
    surveyUrl
  };
  return mailWrapper({
    toEmail,
    subject: title,
    template,
    templateData
  });
};
