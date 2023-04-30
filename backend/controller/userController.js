const User = require("../model/user");
const Medicine = require("../model/medicine");
const uploadImage = require("../utils/uploadImage");

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
        User.create({ ...req.body }).then((user) =>
          res.json({ email: user.email, id: user.id, isAdmin: user.isAdmin })
        );
      }
    })
    .catch((err) => res.send(err));
};

// user login
const postLoginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        // check for password
        if (user.password === password) {
          // update isLoggedIn in db
          user.isLoggedIn = true;
          return user.save().then(() => {
            return res
              .status(200)
              .json({ email: user.email, id: user.id, isAdmin: user.isAdmin });
          });
        } else {
          return res.json("Incorrect email/password combination");
        }
      } else {
        return res.json(
          "No account with this email. Kindly check your email or register yourself !"
        );
      }
    })
    .catch((err) => res.send(err));
};

// user medicine donatio
const postMedicineDonation = (req, res, next) => {
  const medImg = uploadImage(req, res);
  const { medName, doe, medType, medDesc, ndc } = req.body;

  // db
  Medicine.create({
    medName,
    medDesc,
    medType,
    medImg,
    doe,
    ndc,
    UserId: req.user.id,
  })
    .then(() => {
      return res.send("Medicine inserted successfully");
    })
    .catch((err) => res.send(err));
};

const mapMedicinesToUser = async () => {
  // SUPERHUMAN LOGIC -> DO NOT TOUCH
  const medicineArr = await Medicine.findAll({
    where: { adminApproved: true },
  });

  const userKeys = [];
  const medsWithUserDetails = [...medicineArr];

  medicineArr.forEach((med) => {
    const { UserId } = med;
    userKeys.push(UserId);
  });

  const users = await User.findAll({ where: { id: userKeys } });

  medicineArr.forEach((med, index) => {
    const { UserId } = med;

    if (UserId === users[index].id) {
      medsWithUserDetails[index].UserId = users[index];
    }
  });

  return medsWithUserDetails;
};

// get donated medicines
const getDonatedMedicines = (req, res, next) => {
  // get meds -> only admin approved (1)

  mapMedicinesToUser()
    .then((dataArr) => {
      return res.status(200).send(dataArr);
    })
    .catch((err) => res.send(err));
};

const getDonatedMedicinesOne = (req, res, next) => {
  const { medId } = req.params;

  mapMedicinesToUser()
    .then((dataArr) => {
      // id is 1 -> index in arr is 0
      return res.status(200).send(dataArr[medId - 1]);
    })
    .catch((err) => res.send(err));
};

module.exports = {
  postRegisterUser,
  postLoginUser,
  postMedicineDonation,
  getDonatedMedicines,
  getDonatedMedicinesOne,
};
