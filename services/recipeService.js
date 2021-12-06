const { Recipe } = require('../models');
/* ===== Recipe Create ===== */
/**
 * Used to create a recipe for a given user.
 * @param {string} appId Primary Key of API Key.
 * @param {string} ownerId Primary Key of UserTable.
 * @param {string} name Name of recipe.
 * @param {string} directions Directions for recipe.
 * @param {string} cookTime Cook time in minutes for recipe.
 * @param {number} servingSize Serving size for recipe.
 * @param {string} photoUrl URL to photo of recipe.
 * @param {string} category Category for recipe (Breakfast, Lunch, Dinner, Dessert).
 * 
 * @returns The Recipe ID if recipe is created
 */
const create = async ({ appId, name, directions, cookTime, servingSize, photoUrl, category, ownerId }) => {
  try {
    const newRecipe = await Recipe.create({ name, directions, cookTime, servingSize, photoUrl, category, ownerId, appId });
    return newRecipe.id;
  } catch (e) {
    throw e;
  }
};

/* ===== Recipe Records By OwnerId ===== */
/**
 * Used to retrieve all records based on user logged in.
 * @param {string} appId Primary Key of API Key.
 * @param {string} ownerId Primary Key of UserTable.
 * @returns Recipe Records for Individual Owner
 */
const get = async ({ appId, ownerId }) => {
  try {
    const query = { where: { appId, ownerId } };
    const recipeRecords = await Recipe.findAll(query);

    return recipeRecords;
  } catch (e) {
    throw e;
  }
};

const getMine = async ({ appId, ownerId }) => {
  try {
    const query = { where: { ownerId } };
    const recipeRecords = await Recipe.findOne(query);
    return recipeRecords;
  } catch (e) {
    throw e;
  }
};

/* ===== Deletes Records For Logged in User ===== */
/**
 * Used to retrieve all records based on user logged in.
 * @param {string} appId Primary Key of API Key.
 * @param {string} ownerId Primary Key of UserTable.
 * @param {string} id Primary Key of Recipe.
 * @returns Total number of records deleted based on query
 */
const remove = async ({ appId, id, ownerId }) => {
  try {
    const query = { where: { appId, id, ownerId } };
    const recipeRecords = await Recipe.destroy(query);
    return recipeRecords;
  } catch (e) {
    throw e;
  }
};

/* ===== Recipe Update ===== */
/**
 * Used to create a recipe for a given user.
 * @param {string} appId Primary Key of API Key.
 * @param {string} ownerId Primary Key of UserTable.
 * @param {string} name Name of recipe.
 * @param {string} directions Directions for recipe.
 * @param {string} cookTime Cook time in minutes for recipe.
 * @param {number} servingSize Serving size for recipe.
 * @param {string} photoUrl URL to photo of recipe.
 * @param {string} category Category for recipe (Breakfast, Lunch, Dinner, Dessert).
 * @param {string} title Title of recipe entry.
 * @param {string} id Primary Key of Recipe.

 * @returns Total number of records that were updated based on query
 */

const update = async ({ appId, name, directions, cookTime, servingSize, photoUrl, category, ownerId, id }) => {
  try {
    const columnsToUpdate = { name, directions, cookTime, servingSize, photoUrl, category };
    const query = {
      where: {
        ownerId,
        appId,
        id
      }
    };
    const updatedRecipe = await Recipe.update(columnsToUpdate, query);
    return updatedRecipe;
  } catch (e) {
    throw e;
  }
};

module.exports = { create, get, getMine, remove, update };
