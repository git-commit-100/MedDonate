const User = require("../model/user");

// user registration
const postRegisterUser = (req, res, next) => {
  // check if user already has an account
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        return res.json(
          "Account already registered. Please Log in to proceed !"
        );
      } else {
        // no user -> create a user
        User.create({ ...req.body }).then((data) => res.json(data));
      }
    })
    .catch((err) => console.log(err));
};

// user login
const postLoginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        // check for password
        if (user.password === password) {
          return res.status(200).json(user);
        } else {
          return res.json("Incorrect email/password combination");
        }
      } else {
        return res.json(
          "No account with this email. Kindly check your email or register yourself !"
        );
      }
    })
    .catch((err) => console.log(err));
};

module.exports = {
  postRegisterUser,
  postLoginUser,
};
