// creating express app
const express = require("express");
const app = express();
const sequelize = require("./utils/database");
const User = require("./model/user");

// requiring extra dependencies
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;

//file import
const userRouter = require("./routes/userRouter");

// registering middlewares
app.use("", cors());
app.use("", bodyParser.urlencoded({ extended: false }));
app.use("", express.json());

app.use("/user", userRouter);

// routes
app.get("", (req, res, next) => {
  res.json({ response: "This is a MedDonate API ;)" });
});

// fallback route
app.use("*", (req, res, next) => {
  res.status(404).json({ response: "Invalid route" });
});

// driver
sequelize
  .sync()
  // .sync({force: true})
  .then(() => {
    app.listen(PORT);
    console.log("\nConnected to db successfully 🟢");
  })
  .catch((err) => console.log(err));
