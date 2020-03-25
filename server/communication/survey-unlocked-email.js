const path = require("path");
const pug = require("pug");
const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_API_BASE_URL;
const API_KEY = process.env.MAILGUN_API_KEY;
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

const template = pug.compileFile(
  path.resolve(__dirname, "..", "surveys", "survey-unlocked.pug")
);

module.exports = ({ toEmail, surveyUrl }) => {
  const title = "🤘 Survey results ready";
  const data = {
    from: "Worthwise <noreply@worthwise.work>",
    to: toEmail,
    subject: title,
    html: template({
      title,
      surveyUrl
    })
  };
  console.log(data);
  return new Promise((resolve, reject) => {
    console.log(`Sending survey unlocked email to ${toEmail} ...`);
    mg.messages().send(data, (error, body) => {
      if (error) {
        return reject(error);
      }

      console.log(`Survey unlocked email sent to ${toEmail}`);
      return resolve();
    });
  });
};
