// creating express app
const express = require("express");
const app = express();

// requiring extra dependencies
const cors = require("cors");
const bodyParser = require("body-parser");

// requiring file exports
// ...

// parsing all requests
app.use("", cors());
app.use("", bodyParser.urlencoded({ extended: false }));

// logic
app.get("", (req, res, next) => {
  res.json({ response: "Hello from express" });
});

app.listen(8080);
