// creating express app
const express = require("express");
const app = express();
const sequelize = require("./utils/database");
const fileUpload = require("express-fileupload");
const User = require("./model/user");
const medicine = require("./model/medicine");
const path = require("path");
const rootDir = require("./utils/path");

// requiring extra dependencies
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;

//file import
const userRouter = require("./routes/userRouter");

// registering middlewares
app.use("", cors());
app.use("", bodyParser.json());
app.use("", bodyParser.urlencoded({ extended: false }));
app.use("", fileUpload());

// static serving to /uploads folder
app.use(express.static(path.join(rootDir, "uploads")));

// registering an extra middleware to pass model obj in req
app.use("/", (req, res, next) => {
  User.findOne({ where: { isLoggedIn: true } })
    .then((user) => {
      // passing user to req obj
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});


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
  // .sync({ force: true })
  .then(() => {
    // if no user then create
    return User.findAll({ where: { phone_number: "9175899936" } });
  })
  .then((users) => {
    if (users.length === 0) {
      // create
      User.bulkCreate([
        {
          id: 1,
          isAdmin: 1,
          name: "Admin",
          email: "admin@medDonate.com",
          password: "admin123",
          phone_number: "9175899936",
          city: "Vasai",
          address: "000",
        },
        {
          id: 2,
          isAdmin: 0,
          name: "Bhargav",
          email: "bhargav@gmail.com",
          password: "12345678",
          phone_number: "9175899936",
          city: "Vasai",
          address: "Abhilasha, Sai Nagar, Vasai west",
        },
      ]);
    } else {
      return users;
    }
  })
  .then(() => {
    app.listen(PORT);
    console.log("\nConnected to db successfully 🟢");
  })
  .catch((err) => console.log(err));
