const { Sequelize } = require("sequelize/types");
const { sequelize } = require("./db.js");

const Menu = sequelize.define("Menu", {
  title: Sequelize.STRING,
});

module.exports = {
  Menu,
};
