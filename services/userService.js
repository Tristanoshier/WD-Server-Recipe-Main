const { User } = require('../models');
const Profile = require('../services/profileService');

/**
 * User Creation
 * @param {string} email The email the new user will be identified by
 * @param {string} password The password HASH the user will use to log in
 * @param {string} appId The appId the primary key that belongs to the APIKey
 * @returns {number} The ID of the newly created user or null
 */
const create = async ({ email, password, appId }) => {
  try {
    const newUser = await User.create({
      email,
      password,
      appId
    });

    const newProfile = await Profile.create(newUser.id);

    return newUser && newProfile ? newUser.id : null;
  } catch (e) {
    throw e;
  }
};

const remove = async () => {};

const modify = async () => {};

/* ===== User Search By Email ===== */
/**
 * Used to retrieve a User by searching for a specific EMAIL.
 * @param {string} email The Email of the client you are searching for.
 * @returns The Client object if it found one, Null if it did not.
 */
const get = async email => await User.findOne({ where: { email } });

module.exports = {
  create,
  get,
  modify,
  remove
};
