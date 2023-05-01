const sequelize = require("../utils/database");
const { DataTypes } = require("sequelize");

const Medicine = sequelize.define("Medicine", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  medName: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  medDesc: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  medType: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  ndc: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  doe: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  medImg: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  // optional field
  prescription: {
    type: DataTypes.TEXT,
  },
  adminApproveDonation: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true,
    },
  },
  adminApproveReceive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Medicine;
