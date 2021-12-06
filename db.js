const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.DATABASE_CONNECTION_URL);

module.exports = db;
