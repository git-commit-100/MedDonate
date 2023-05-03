const express = require("express");

const router = express.Router();

const {
  adminGetReceivedMedicines,
  adminGetDonatedMedicines,
  getAdminDonatedMedicineOne,
  adminPostApproveDonation,
  adminPostRejectDonation,
  adminPostApproveReceive,
  adminPostRejectReceive,
  adminGetUsers,
  adminCreateUser,
  adminDeleteUser,
} = require("../controller/adminController");

router.post("/receive-approve/:medId", adminPostApproveReceive);

router.post("/receive-reject/:medId", adminPostRejectReceive);

// route -> /admin/receive
router.get("/receive", adminGetReceivedMedicines);

router.post("/donate-approve/:medId", adminPostApproveDonation);

router.post("/donate-reject/:medId", adminPostRejectDonation);

router.get("/donate/:medId", getAdminDonatedMedicineOne);

// route -> /admin/donate
router.get("/donate", adminGetDonatedMedicines);

router.get("/users", adminGetUsers);

router.post("/create-user", adminCreateUser);

router.post("/delete-user/:userId", adminDeleteUser);

router.get("/", (req, res, next) => {
  res.json({ response: "Admin router" });
});

module.exports = router;
