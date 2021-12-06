const { PROFILE_ALREADY_EXISTS } = require('../controllers/constants');
const { Profile, User } = require('../models');
const sequelize = require('../db');

const getProfileId = async userId => await User.findOne({ where: { userId } })?.id;
/**
 * Creates User Profile
 * @param {string} userId Primary Key of the User that is Logged In
 * @returns {number} The ID of the newly created profile
 */
const create = async userId => {
  try {
    const isExistingProfile = await getProfileId(userId);

    if (isExistingProfile) throw new Error(PROFILE_ALREADY_EXISTS);
    const newProfile = await Profile.create({
      userId
    });
    return newProfile.id;
  } catch (e) {
    throw e;
  }
};

const remove = async () => {};

/**
 * Modifies User Profile
 * @param {string} userId Primary Key of the User that is Logged In
 * @param {string} firstName
 * @param {string} favoriteCuisine
 * @returns {araray} Number of records that were updated
 */
const modify = async ({ firstName, favoriteCuisine, userId }) => {
  const query = { where: { userId } };
  const columnsToUpdate = { firstName, favoriteCuisine };
  const updateProfileRecordCount = await Profile.update(columnsToUpdate, query);
  return updateProfileRecordCount;
};

/* ===== Profile Search by UserId ===== */
/**
 * Used to retrieve a User by searching for a specific EMAIL.
 * @param {string} userId The Email of the client you are searching for.
 * @returns The Profile object if it found one to include the associated table of User, Null if it did not.
 */
const get = async id => await User.findOne({ where: { id }, include: 'profile' });

const getById = async ({ ownerId, appId }) => {
  const query = `select * from profiles INNER JOIN users ON "userId" = users.id where "appId" = ${appId} and "userId" = ${ownerId}`;
  const profile = await sequelize.query(query);
  return profile[0] ?? [];
};
module.exports = {
  create,
  get,
  modify,
  getById,
  remove
};
