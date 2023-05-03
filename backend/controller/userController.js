const User = require("../model/user");
const Medicine = require("../model/medicine");
const Order = require("../model/order");
const uploadImage = require("../utils/uploadImage");
const { Op, where, or } = require("sequelize");

// user registration
const postRegisterUser = (req, res) => {
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
const postLoginUser = (req, res) => {
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
const postLogoutUser = (req, res) => {
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
const postMedicineDonation = (req, res) => {
  const medImg = uploadImage(req, res);
  const { userId, medName, doe, medType, medDesc, ndc } = req.body;

  // db
  Medicine.create({
    medName,
    medDesc,
    medType,
    medImg,
    doe,
    ndc,
    donatingUser: userId,
  })
    .then((med) => {
      // special method
      return Order.create({
        medId: med.id,
      });
      // create order
    })
    .then((something) => {
      console.log(something);
      return res.send("Medicine inserted successfully");
    })
    .catch((err) => res.send(err));
};

// get donated medicines
const getDonatedMedicines = (req, res) => {
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

const getDonatedMedicinesOne = (req, res) => {
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

const getReceivedMedicines = (req, res) => {
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

const postReceivedMedicines = (req, res) => {
  const { userId, medId } = req.params;
  // logged in user

  // get medicine
  Medicine.findOne({ where: { id: medId } })
    .then((med) => {
      med.receivingUser = userId;
      return med.save();
    })
    .then(() => {
      return res.status(200).send("Medicine request successful");
    })
    .catch((err) => res.send(err));
};

// get user profile
const getUserProfile = (req, res) => {
  const { userId } = req.params;

  User.findOne({ where: { id: userId } })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => res.send(err));
};

// post user profie -> updated changes
const postUserProfile = (req, res) => {
  const { userId } = req.params;
  const { name, email, password, phone_number, city, address } = req.body;

  User.findOne({ where: { id: userId } })
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

const getUserDonatedMedicine = (req, res) => {
  const { userId } = req.params;

  Order.findAll({
    include: {
      model: Medicine,
      as: "medInfo",
      where: { donatingUser: userId },
      include: [
        { model: User, as: "donatingUserInfo" },
        { model: User, as: "receivingUserInfo" },
      ],
    },
  })
    .then((meds) => res.status(200).send(meds))
    .catch((err) => res.send(err));
};

const getUserReceivedMedicine = (req, res) => {
  const { userId } = req.params;

  Order.findAll({
    include: {
      model: Medicine,
      as: "medInfo",
      where: { receivingUser: userId },
      include: [
        { model: User, as: "donatingUserInfo" },
        { model: User, as: "receivingUserInfo" },
      ],
    },
  })
    .then((meds) => res.status(200).send(meds))
    .catch((err) => res.send(err));
};

const postChangeOrderState = (req, res) => {
  const { orderId, type } = req.params;

  if (type === "dispatch") {
    Order.findOne({ where: { id: orderId } })
      .then((order) => {
        order.order_dispatched = true;
        return order.save();
      })
      .then(() => res.send("Order status updated successfully"))
      .catch((err) => res.semd(err));
  } else {
    Order.findOne({ where: { id: orderId } })
      .then((order) => {
        order.order_received = true;
        return order.save();
      })
      .then(() => res.send("Order status updated successfully"))
      .catch((err) => res.semd(err));
  }
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
  postUserProfile,
  getUserDonatedMedicine,
  getUserReceivedMedicine,
  postChangeOrderState,
};
