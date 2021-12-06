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

const Recipe = db.define('recipe', {
  name: {
    type: DataTypes.STRING,
    defaultValue: 'Spaghetti'
  },
  directions: {
    type: DataTypes.STRING,
    defaultValue: 'We add a lot of salt to our pasta water (it makes the pasta taste delicious). For every 4 quarts (16 cups) of water, we add about one tablespoon of salt. This is perfect for cooking 1 pound of pasta.'
  },
  cookTime: {
    type: DataTypes.STRING,
    defaultValue: '20 Minutes'
  },
  servingSize: {
    type: DataTypes.INTEGER,
    defaultValue: 2
  },
  photoUrl: {
    type: DataTypes.STRING,
    defaultValue: 'https://unsplash.com/photos/PLyJqEJVre0'
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'Breakfast'
  },
})

// Put all other models below here for the app

module.exports = {
  User,
  Profile,
  Recipe
};
