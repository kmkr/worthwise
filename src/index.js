import { Fragment, render, h } from "preact";
import CreateSurvey from "./create-survey";

const App = <CreateSurvey />;

const container = document.getElementById("app");
render(App, container);
