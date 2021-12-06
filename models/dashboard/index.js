const db = require("../../db");
const { DataTypes } = require("sequelize");

const ApiKey = db.define("apikey", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Client = db.define("client", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Group = db.define("group", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Membership = db.define("membership", {});

module.exports = {
  ApiKey,
  Client,
  Group,
  Membership,
};
