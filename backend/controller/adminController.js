const User = require("../model/user");
const Medicine = require("../model/medicine");
const uploadImage = require("../utils/uploadImage");
const { Op } = require("sequelize");

const adminGetReceivedMedicines = (req, res, next) => {
  Medicine.findAll({
    where: {
      receivingUserId: {
        // column is !null -> has something
        [Op.ne]: null,
      },
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

module.exports = {
  adminGetReceivedMedicines,
};
