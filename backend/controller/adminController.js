const User = require("../model/user");
const Medicine = require("../model/medicine");
const uploadImage = require("../utils/uploadImage");
const { Op } = require("sequelize");

const adminGetDonatedMedicines = (req, res, next) => {
  Medicine.findAll({
    where: {
      donatingUser: {
        [Op.ne]: null,
      },
    },
    include: [
      { model: User, as: "donatingUserInfo" },
      // { model: User, as: "receivingUserInfo" },
    ],
  })
    .then((meds) => {
      return res.status(200).send(meds);
    })
    .catch((err) => res.send(err));
};

const getAdminDonatedMedicineOne = (req, res, next) => {
  const { medId } = req.params;

  Medicine.findOne({
    where: { id: medId },
    include: { model: User, as: "donatingUserInfo" },
  })
    .then((med) => {
      if (!med) {
        return res.status(200).send(null);
      } else {
        return res.status(200).send(med);
      }
    })
    .catch((err) => res.send(err));
};

const adminGetReceivedMedicines = (req, res, next) => {
  Medicine.findAll({
    where: {
      receivingUser: {
        // column is !null -> has something
        [Op.ne]: null,
      },
    },
    include: [
      { model: User, as: "donatingUserInfo" },
      { model: User, as: "receivingUserInfo" },
    ],
  }).then((meds) => {
    if (meds.length === 0) {
      // no receiving requets
      return res.status(200).send("No records found");
    } else {
      return res.status(200).send(meds);
    }
  });
};

const adminPostApproveDonation = (req, res, next) => {
  const { medId } = req.params;

  Medicine.findOne({ where: { id: medId } })
    .then((med) => {
      med.adminApproveDonation = true;
      return med.save();
    })
    .then(() => res.status(200).send("Donation Status updated successfully"))
    .catch((err) => res.send(err));
};

const adminPostRejectDonation = (req, res, next) => {
  const { medId } = req.params;

  Medicine.destroy({ where: { id: medId } })
    .then(() => res.status(200).send("Medicine removed successfully"))
    .catch((err) => res.send(err));
};

module.exports = {
  adminGetDonatedMedicines,
  adminGetReceivedMedicines,
  getAdminDonatedMedicineOne,
  adminPostApproveDonation,
  adminPostRejectDonation,
};
