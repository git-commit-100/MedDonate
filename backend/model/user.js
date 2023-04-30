const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define("User", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  isAdmin: {
    // 1/0
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true,
    },
  },
  isLoggedIn: {
    // 1/0
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true,
    },
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      // is: "/^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+.[a-zA-Z0-9.]+$/",
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  phone_number: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      // is: "/^[0-9]{10}$/",
    },
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  city: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = User;
