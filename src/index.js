import { Fragment, render, h } from "preact";
import Routes from "./routes";

const container = document.getElementById("app");
render(<Routes />, container);
