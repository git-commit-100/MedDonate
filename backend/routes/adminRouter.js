const express = require("express");

const router = express.Router();

const { adminGetReceivedMedicines } = require("../controller/adminController");

// route -> /admin/receive
router.get("/receive", adminGetReceivedMedicines);

router.get("/", (req, res, next) => {
  res.json({ response: "Admin router" });
});

module.exports = router;
