const { Sequelize } = require("sequelize/types");
const { sequelize } = require("./db.js");

const Restaurant = sequelize.define("Restaurant", {
  name: Sequelize.STRING,
  location: Sequelize.STRING,
  cuisine: Sequelize.STRING,
});

module.exports = {
  Restaurant,
};
