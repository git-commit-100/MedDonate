const express = require("express");

const router = express.Router();

const {
  postRegisterUser,
  postLoginUser,
} = require("../controller/userController");

// route -> /user/register
router.post("/register", postRegisterUser);

// route -> /user/login
router.post("/login", postLoginUser);

module.exports = router;
