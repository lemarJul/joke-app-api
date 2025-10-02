const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || "sqlite",
  storage: process.env.DB_STORAGE || "./database/jokes.sqlite",
  logging: false,
});

module.exports = sequelize;
