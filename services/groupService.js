const Op = require('sequelize').Op;
const { Group } = require('../models');

/* ===== Group Creation ===== */
/**
 * Used for creating a group with a name.
 * @param {string} name The name of the group designated.
 * @returns The Created Group object.
 */
const create = async name =>
  await Group.create({
    name
  });

/* ===== Group Find One By ID ===== */
/**
 * Used for finding a single group by it's ID.
 * @param {number} id The ID of the group you are searching for.
 * @returns The Group object if found, Null if not
 */
const getOne = async id => await Group.findByPk(id);

/* ===== Group Find All By IDs ===== */
/**
 * Used for finding a list of Groups by their IDs.
 * @param {Array.<number>} ids Array of IDs to find groups with.
 * @returns An Array of groups or null if it found none.
 */
const getAllByIds = async ids =>
  new Promise(async (resolve, reject) => {
    if (!ids.length) resolve([]);
    resolve(
      await Group.findAll({
        where: {
          id: {
            [Op.or]: ids
          }
        }
      })
    );
  });

module.exports = {
  create,
  getOne,
  getAllByIds
};
