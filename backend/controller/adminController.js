const User = require("../model/user");
const Medicine = require("../model/medicine");
const uploadImage = require("../utils/uploadImage");
const { Op } = require("sequelize");
const Order = require("../model/order");

const adminGetDonatedMedicines = (req, res) => {
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

const getAdminDonatedMedicineOne = (req, res) => {
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

const adminGetReceivedMedicines = (req, res) => {
  Order.findAll({
    include: {
      model: Medicine,
      as: "medInfo",
      required: false,
      where: {
        receivingUser: {
          [Op.ne]: null,
        },
      },
      include: [
        { model: User, as: "donatingUserInfo" },
        { model: User, as: "receivingUserInfo" },
      ],
    },
  }).then((meds) => {
    if (meds.length === 0) {
      // no receiving requets
      return res.status(200).send("No records found");
    } else {
      return res.status(200).send(meds);
    }
  });
};

const adminPostApproveDonation = (req, res) => {
  const { medId } = req.params;

  Medicine.findOne({ where: { id: medId } })
    .then((med) => {
      med.adminApproveDonation = true;
      return med.save();
    })
    .then(() => res.status(200).send("Donation Status updated successfully"))
    .catch((err) => res.send(err));
};

const adminPostRejectDonation = (req, res) => {
  const { medId } = req.params;

  Medicine.destroy({ where: { id: medId } })
    .then(() => res.status(200).send("Medicine removed successfully"))
    .catch((err) => res.send(err));
};

const adminPostApproveReceive = (req, res) => {
  const { medId } = req.params;

  Medicine.findOne({ where: { id: medId } })
    .then((med) => {
      med.adminApproveReceive = true;
      return med.save();
    })
    .then(() => res.status(200).send("Donation Status updated successfully"))
    .catch((err) => res.send(err));
};

const adminPostRejectReceive = (req, res) => {
  const { medId } = req.params;

  Medicine.destroy({ where: { id: medId } })
    .then(() => res.status(200).send("Medicine removed successfully"))
    .catch((err) => res.send(err));
};

const adminGetUsers = (req, res) => {
  // only get users -> not admin
  User.findAll({ where: { isAdmin: false } })
    .then((users) => {
      return res.status(200).send(users);
    })
    .catch((err) => res.send(err));
};

const adminCreateUser = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        return res.json("Account already exists !");
      } else {
        // no user -> create a user
        User.create({ ...req.body }).then(() =>
          res.status(200).send("User created successfully")
        );
      }
    })
    .catch((err) => res.send(err));
};

const adminDeleteUser = (req, res) => {
  const { userId } = req.params;

  User.destroy({ where: { id: userId } })
    .then(() => res.status(200).send("User deleted successfully"))
    .catch((err) => res.send(err));
};

module.exports = {
  adminGetDonatedMedicines,
  adminGetReceivedMedicines,
  getAdminDonatedMedicineOne,
  adminPostApproveDonation,
  adminPostRejectDonation,
  adminPostApproveReceive,
  adminPostRejectReceive,
  adminGetUsers,
  adminCreateUser,
  adminDeleteUser,
};
