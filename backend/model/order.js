const sequelize = require("../utils/database");
const { DataTypes } = require("sequelize");

const Order = sequelize.define("Order", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  order_dispatched: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  order_received: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Order;
