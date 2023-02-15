const { sequelize } = require("../db");
const { Sequelize } = require("sequelize");

const Menu = sequelize.define("Menu", {
  title: Sequelize.STRING,
});

module.exports = { Menu };
