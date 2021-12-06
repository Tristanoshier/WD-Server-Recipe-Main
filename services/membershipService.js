const Op = require("sequelize").Op;
const { Membership } = require("../models");

/* ===== Membership Creation ===== */
/**
 * Used to create a Membership between a Client and Group.
 * @param {number} client The ID for the client to create the membership for
 * @param {number} group The ID for the group to create the membership for
 * @returns The Membership object if it succesfully created, otherwise False.
 */
const create = async (client, group) => {
  try {
    const newMembership = await Membership.create({
      clientId: client,
      groupId: group,
    });
    return newMembership;
  } catch (e) {
    console.log(e);
    return false;
  }
};

/* ===== Membership Verification ===== */
/**
 * Used to verify a client has a group membership
 * @param {number} clientId The ID of the Client to check Membership of.
 * @param {number} groupId The ID of the Group to check Membership of.
 * @returns The Membership object if Membership is valid, otherwise false.
 */
const checkMembership = async (clientId, groupId) => {
  try {
    let foundMembership = await Membership.findOne({
      where: {
        [Op.and]: [{ clientId: clientId }, { groupId: groupId }],
      },
    });
    console.log(foundMembership);
    return foundMembership;
  } catch (e) {
    console.log(e);
    return false;
  }
};

/* ===== Memberships For A Client ===== */
/**
 * Used to pull all memberships that a Client has.
 * @param {number} clientId The ID of the client you are searching memberships for.
 * @returns An Array of the Memberships found for the client, or Null if it found none.
 */
const clientMemberships = async (clientId) =>
  await Membership.findAll({
    where: {
      clientId,
    },
  });

/* ===== Memberships For A Group ===== */
/**
 * Used to pull all memberships that a Group has.
 * @param {number} groupId The ID of the group you are retrieving memberships for.
 * @returns An Array of the memberships found for the Group.
 */
const groupMemberships = async (groupId) =>
  await Membership.findAll({ where: { groupId } });


/* ===== Remove A Membership ===== */
/**
 * Used to remove a membership.
 * @param {number} groupId The ID of the group the client will be removed from
 * @param {number} clientId The ID of the client to remove from the group
 * @returns {number} The number of items it removed (should be 1 or 0)
 */
const removeMembership = async (groupId, clientId) => 
  await Membership.destroy({
    where: {
      [Op.and]: [{ clientId: clientId }, { groupId: groupId }]
    }
  });

module.exports = {
  checkMembership,
  clientMemberships,
  create,
  groupMemberships,
  removeMembership
};
