const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("med_donate", "root", "sqlR00tPa$$", {
  dialect: "mysql",
  host: "localhost",
  database: "med_donate"
});

module.exports = sequelize;