const path = require("path");

const express = require("express");

const app = express();
app.use("/dist", express.static(path.resolve(__dirname, "..", "dist")));
const port = process.env.PORT || 3000;

app.get("/", (request, response) =>
  response.sendFile(path.join(__dirname + "/index.html"))
);

app.post("/survey", (request, response) => response.send("Yay"));

app.listen(port, () => console.log(`App listening on port ${port}!`));
