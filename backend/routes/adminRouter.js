const express = require("express");

const router = express.Router();

const {
  adminGetReceivedMedicines,
  adminGetDonatedMedicines,
  getAdminDonatedMedicineOne,
  adminPostApproveDonation,
  adminPostRejectDonation,
} = require("../controller/adminController");

// route -> /admin/receive
router.get("/receive", adminGetReceivedMedicines);

router.post("/donate-approve/:medId", adminPostApproveDonation);

router.post("/donate-reject/:medId", adminPostRejectDonation);

router.get("/donate/:medId", getAdminDonatedMedicineOne);

// route -> /admin/donate
router.get("/donate", adminGetDonatedMedicines);

router.get("/", (req, res, next) => {
  res.json({ response: "Admin router" });
});

module.exports = router;
