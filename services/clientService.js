const Op = require('sequelize').Op;
const { Client } = require('../models');

/* ===== Client Creation ===== */
/**
 * Used to Create a new Client and store it in the Database.
 * @param {string} name The Name of the User.
 * @param {string} email The email of the User.
 * @param {string} password The HASHED password of the user.
 * @returns The client it created, or false if it failed.
 */
const create = async (name = 'YourName', email, password) => {
  try {
    const newClient = await Client.create({
      name,
      email,
      password
    });
    return newClient;
  } catch (e) {
    console.log(e);
    return false;
  }
};

/* ===== Client Search By Email ===== */
/**
 * Used to retrieve a Client by searching for a specific EMAIL.
 * @param {string} email The Email of the client you are searching for.
 * @returns The Client object if it found one, Null if it did not.
 */
const get = async email => await Client.findOne({ where: { email } });

/* ===== Client Search By ID ===== */
/**
 * Used to retrieve a Client by searching for a specific ID.
 * @param {number} id The ID of the stored Client.
 * @returns The Client object if it found one, Null if it did not.
 */
const getById = async id => await Client.findByPk(id);

/* ===== Client Update Name ===== */
/**
 * Used to update a Client's name value.
 * @param {number} id The ID of the stored Client.
 * @param {string} name The new Name value to store.
 * @returns Returns TRUE if it successfully updated, False if it did not
 */
const update = async (id, name) => {
  try {
    let myClient = await Client.findOne({ where: { id } });
    myClient.update({ name });
    return true;
  } catch (e) {
    return false;
  }
};

/* ===== Client Retrieve Several By ID ===== */
/**
 * Used to retrieve a group of Clients using their IDs.
 * @param {Array.<number>} ids Array of IDs to retrieve.
 * @returns Array of Clients found from the search.
 */
const getAllById = async ids =>
  await Client.findAll({
    where: {
      id: {
        [Op.or]: ids
      }
    }
  });

module.exports = {
  create,
  get,
  getById,
  getAllById,
  update
};
