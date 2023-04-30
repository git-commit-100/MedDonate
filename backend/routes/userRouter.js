const express = require("express");

const router = express.Router();

const {
  postRegisterUser,
  postLoginUser,
  postMedicineDonation,
  getDonatedMedicines,
  getDonatedMedicinesOne,
} = require("../controller/userController");

// route -> /user/register
router.post("/register", postRegisterUser);

// route -> /user/login
router.post("/login", postLoginUser);

// route -> /user/donate1
router.get("/donate/:medId", getDonatedMedicinesOne);

// route -> /user/donate
router.get("/donate", getDonatedMedicines);

// route -> /user/donate
router.post("/donate", postMedicineDonation);

module.exports = router;
