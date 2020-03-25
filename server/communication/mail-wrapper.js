const path = require("path");
const pug = require("pug");
const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_API_BASE_URL;
const API_KEY = process.env.MAILGUN_API_KEY;
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

module.exports = ({ toEmail, subject, template, templateData }) => {
  const title = subject;
  const data = {
    from: "Worthwise <noreply@worthwise.work>",
    to: toEmail,
    subject: title,
    html: template(templateData)
  };
  console.log(data);
  return new Promise((resolve, reject) => {
    console.log(`Sending email to ${toEmail} ...`);
    mg.messages().send(data, (error, body) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};
