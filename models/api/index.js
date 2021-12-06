const db = require('../../db');
const { DataTypes } = require('sequelize');

const User = db.define('user', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Profile = db.define('profile', {
  firstName: {
    type: DataTypes.STRING,
    defaultValue: 'Jane/John'
  },
  lastName: {
    type: DataTypes.STRING,
    defaultValue: 'Jane/John'
  }
});

// Put all other models below here for the app

module.exports = {
  User,
  Profile
};
