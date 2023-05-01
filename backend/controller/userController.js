const User = require("../model/user");
const Medicine = require("../model/medicine");
const uploadImage = require("../utils/uploadImage");
const { Op, and } = require("sequelize");

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
          if (user.isLoggedIn === true) {
            return res.send(
              "User is already logged in. Logout from other accounts !"
            );
          }
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

// user logout
const postLogoutUser = (req, res, next) => {
  const { id } = req.params;

  User.findOne({ where: { id: id } })
    .then((user) => {
      if (!user) {
        return res.status(200).send("User not found !");
      }
      // logout
      user.isLoggedIn = false;
      return user.save();
    })
    .then(() => res.send("User logged out successfully"))
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
    donatingUser: req.user.id,
  })
    .then(() => {
      return res.send("Medicine inserted successfully");
    })
    .catch((err) => res.send(err));
};

// get donated medicines
const getDonatedMedicines = (req, res, next) => {
  // get meds -> only admin approved (1)
  Medicine.findAll({
    where: {
      adminApproveDonation: true,
      receivingUser: {
        [Op.is]: null,
      },
    },
    include: [
      { model: User, as: "donatingUserInfo" },
      { model: User, as: "receivingUserInfo" },
    ],
  })
    .then((meds) => {
      if (meds.length === 0) {
        return res.status(200).send([]);
      }
      return res.status(200).send(meds);
    })
    .catch((err) => res.send(err));
};

const getDonatedMedicinesOne = (req, res, next) => {
  const { medId } = req.params;

  Medicine.findOne({
    where: {
      adminApproveDonation: true,
      id: medId,
      receivingUser: {
        [Op.is]: null,
      },
    },
    include: [
      { model: User, as: "donatingUserInfo" },
      { model: User, as: "receivingUserInfo" },
    ],
  })
    .then((med) => {
      if (!med) {
        return res.status(200).send(null);
      }

      return res.status(200).send(med);
    })
    .catch((err) => res.send(err));
};

const getReceivedMedicines = (req, res, next) => {
  // get meds -> only admin approved (1)
  Medicine.findAll({
    where: {
      adminApproveReceive: true,
    },
    include: [
      { model: User, as: "donatingUserInfo" },
      { model: User, as: "receivingUserInfo" },
    ],
  })
    .then((meds) => {
      if (meds.length === 0) {
        return res.status(200).send("No such records");
      }
      return res.status(200).send(meds);
    })
    .catch((err) => res.send(err));
};

const postReceivedMedicines = (req, res, next) => {
  const { medId } = req.params;
  // logged in user
  const { id } = req.user;

  // get medicine
  Medicine.findOne({ where: { id: medId } })
    .then((med) => {
      med.receivingUser = id;

      return med.save();
    })
    .then(() => {
      res.status(200).send("Medicine request successful");
    })
    .catch((err) => res.send(err));
};

// get user profile
const getUserProfile = (req, res, next) => {
  const { id } = req.user;

  User.findOne({ where: { id: id } })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => res.send(err));
};

// post user profie -> updated changes
const postUserProfile = (req, res, next) => {
  const { id, name, email, password, phone_number, city, address } = req.body;

  User.findOne({ where: { id: id } })
    .then((user) => {
      if (!user) {
        return res.status(200).send("User not found");
      }
      user.name = name;
      (user.email = email),
        (user.password = password),
        (user.phone_number = phone_number),
        (user.city = city),
        (user.address = address);
      return user.save();
    })
    .then(() => {
      return res.status(200).send("Profile updated successfully");
    })
    .catch((err) => res.send(err));
};

module.exports = {
  postRegisterUser,
  postLoginUser,
  postMedicineDonation,
  getDonatedMedicines,
  getDonatedMedicinesOne,
  getReceivedMedicines,
  postReceivedMedicines,
  postLogoutUser,
  getUserProfile,
  postUserProfile
};
