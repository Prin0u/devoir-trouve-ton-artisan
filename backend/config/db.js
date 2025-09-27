const { Sequelize } = require("sequelize");
require("dotenv").config();

// Création de la connexion à la base de données

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false,
  }
);

module.exports = sequelize;
