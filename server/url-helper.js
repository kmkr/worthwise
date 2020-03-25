module.exports.getSurveyUrl = id => {
    const surveyPathName = `/surveys/${id}/responses/new`;
    return 
    await sendSurveyCreatedEmail({
      toEmail: ownerEmail,
      surveyUrl: `${process.env.BASE_URL}${surveyPathName}`
    });
}