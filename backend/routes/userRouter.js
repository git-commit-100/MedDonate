const express = require("express");

const router = express.Router();

const {
  postRegisterUser,
  postLoginUser,
  postLogoutUser,
  postMedicineDonation,
  getDonatedMedicines,
  getDonatedMedicinesOne,
  getReceivedMedicines,
  postReceivedMedicines,
  getUserProfile,
  postUserProfile,
  getUserDonatedMedicine,
  getUserReceivedMedicine,
  postChangeOrderState,
} = require("../controller/userController");

// route -> /user/register
router.post("/register", postRegisterUser);

// route -> /user/login
router.post("/login", postLoginUser);

// route -> /user/logout
router.post("/logout/:id", postLogoutUser);

// router -> /user/donated-meds
router.get("/donated-meds", getUserDonatedMedicine);

// router -> /user/received-meds
router.get("/received-meds", getUserReceivedMedicine);

// route -> /user/donate1
router.get("/donate/:medId", getDonatedMedicinesOne);

// route -> /user/donate
router.get("/donate", getDonatedMedicines);

// route -> /user/donate
router.post("/donate", postMedicineDonation);

// route -> /user/receive
router.get("/receive", getReceivedMedicines);

// route -> /user/receive
router.post("/receive/:medId", postReceivedMedicines);

// route -> /user/profile
router.get("/profile", getUserProfile);

// route -> /user/profile
router.post("/profile", postUserProfile);

router.post("/order-status/:orderId/:type", postChangeOrderState);

module.exports = router;
