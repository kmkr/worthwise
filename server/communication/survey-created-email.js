const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_API_BASE_URL;
const API_KEY = process.env.MAILGUN_API_KEY;
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

module.exports = ({ toEmail, surveyUrl }) => {
  const data = {
    from: "Worthwise <noreply@worthwise.work>",
    to: toEmail,
    subject: "🤘 Survey created",
    text: `Awesome, your survey is created. Send it to friends and stuff: ${surveyUrl}`
  };
  return new Promise((resolve, reject) => {
    console.log(`Sending survey created email to ${toEmail}`);
    mg.messages().send(data, (error, body) => {
      if (error) {
        return reject(error);
      }

      console.log(`Survey created email sent to ${toEmail}`);
      return resolve();
    });
  });
};
