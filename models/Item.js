const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const Item = sequelize.define("Item", {
    name: Sequelize.STRING,
    image: Sequelize.STRING,
    price: Sequelize.NUMBER,
    vegetarian: Sequelize.BOOLEAN
});

module.exports = { Item };