import Router from "preact-router";
import { h } from "preact";

import Welcome from "./welcome";
import CreateSurvey from "./create-survey";
import SurveyCreated from "./survey-created";
import SurveyDetails from "./survey-details";

const Routes = () => (
  <Router>
    <Welcome path="/" />
    <CreateSurvey path="/surveys/new" />
    <SurveyDetails path="/surveys/:id/responses/new" />
    <SurveyCreated path="/surveys/:id" />
  </Router>
);

export default Routes;
