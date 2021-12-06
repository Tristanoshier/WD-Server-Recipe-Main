const uuidApiKey = require('uuid-apikey');
const { ApiKey } = require('../models');

/* ===== API Key Creation ===== */
/**
 * Used to generate and retrieve an API key.
 * @param {string} name The name of the key to create.
 * @param {number} groupId The group to associate the key to.
 * @return {string} An KEY representation of the UUID stored in the DB.
 */
const create = async (name, groupId) => {
  const newKey = uuidApiKey.create();
  console.log(newKey);
  await ApiKey.create({
    groupId,
    name,
    key: newKey.uuid
  });
  return newKey.apiKey;
};

/* ===== API Verification ===== */
/**
 * Used to retrieve the APIKey ID associated in the API Table.
 * @param {number} apiKey the UUID that is submitted.
 * @returns {Promise} Id of row that matches the APIKey UUID.
 */
const verifyApiKey = async key => {
  const apiKeyRecord = await ApiKey.findOne({ where: { key } });
  return apiKeyRecord?.id ?? null;
};

/* ===== API Key Retrieve All By Group ===== */
/**
 * Used to retrieve all APIKeys associated with a group.
 * @param {number} groupId The DB ID of the Group.
 * @returns {Promise} Array of API Key Objects, empty if there are none.
 */
const getGroupKeys = async groupId =>
  new Promise(async (resolve, reject) => {
    try {
      let foundKeys = await ApiKey.findAll({
        where: {
          groupId
        }
      });
      console.log(foundKeys);
      resolve(foundKeys.map(x => ({ name: x.name, key: uuidApiKey.toAPIKey(x.key) })));
    } catch (e) {
      reject([]);
    }
  });

module.exports = {
  create,
  getGroupKeys,
  verifyApiKey
};
