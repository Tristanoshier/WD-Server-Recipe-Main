const Services = require('../../services');
const middlewares = require('../../middlewares');
const {
    RECIPE_CREATE_ERROR,
    CREATE_SUCCESS,
    GET_SUCCESS,
    TITLE_RECIPE_ERROR,
    TITLE_DELETE_SUCCESS,
    TITLE_UPDATE_SUCCESS,
    INVALID_RECIPE_CATEGORY
} = require('../constants');
const validateApiKey = require('../../middlewares/validateApiKey');
const validateSession = require('../../middlewares/validateSession');
const { isValidRecipeCategory } = require('../../services/helpers');

const recipeController = require('express').Router();

recipeController.route('/create').post(validateApiKey, validateSession, async (req, res) => {
    try {
        const {
            name,
            directions,
            cookTime,
            servingSize,
            photoUrl,
            category
        } = req.body;
        const ownerId = req.userId;
        const {
            appId
        } = req;

        const isValidCategory = isValidRecipeCategory(category);

        if (!isValidCategory) throw new Error(INVALID_RECIPE_CATEGORY);

        const recipeId = await Services.recipe.create({
            name,
            directions,
            cookTime,
            servingSize,
            photoUrl,
            category,
            ownerId,
            appId
        });

        res.json({
            recipeId,
            info: {
                message: CREATE_SUCCESS
            }
        });
    } catch (e) {
        if (e instanceof Error) {
            const errorMessage = {
                title: RECIPE_CREATE_ERROR,
                info: {
                    message: e.message
                }
            };
            res.send(errorMessage);
        }
    }
});

recipeController.route('/get').get(validateApiKey, validateSession, async (req, res) => {
    try {
        const ownerId = req.userId;
        const {
            appId
        } = req;

        const recipeRecords = await Services.recipe.get({
            ownerId,
            appId
        });

        res.json({
            recipeRecords,
            info: {
                message: GET_SUCCESS
            }
        });
    } catch (e) {
        if (e instanceof Error) {
            const errorMessage = {
                title: TITLE_RECIPE_ERROR,
                info: {
                    message: e.message
                }
            };
            res.send(errorMessage);
        }
    }
});

recipeController.route('/get/mine').get(validateApiKey, validateSession, async (req, res) => {
    try {
        const ownerId = req.userId;
        const {
            apiKey,
            appId
        } = req;

        const recipeRecords = await Services.recipe.getMine({
            appId,
            ownerId
        });

        res.json({
            recipeRecords,
            info: {
                message: GET_SUCCESS
            }
        });
    } catch (e) {
        if (e instanceof Error) {
            const errorMessage = {
                title: TITLE_RECIPE_ERROR,
                info: {
                    message: e.message
                }
            };
            res.send(errorMessage);
        }
    }
});

recipeController.route('/update/:id').put(validateApiKey, validateSession, async (req, res) => {
    try {
        const {
            name,
            directions,
            cookTime,
            servingSize,
            photoUrl,
            category
        } = req.body;
        const {
            id
        } = req.params;
        const ownerId = req.userId;
        const {
            appId
        } = req;

        const recipeId = await Services.recipe.update({
            name,
            directions,
            cookTime,
            servingSize,
            photoUrl,
            category,
            ownerId,
            appId,
            id
        });

        res.json({
            recipeId,
            info: {
                message: TITLE_UPDATE_SUCCESS
            }
        });
    } catch (e) {
        if (e instanceof Error) {
            const errorMessage = {
                title: TITLE_RECIPE_ERROR,
                info: {
                    message: e.message
                }
            };
            res.send(errorMessage);
        }
    }
});

recipeController.route('/delete/:id').delete(validateApiKey, validateSession, async (req, res) => {
    try {
        const ownerId = req.userId;
        const {
            appId
        } = req;
        const {
            id
        } = req.params;

        const recipeRecordsDeleted = await Services.recipe.remove({
            ownerId,
            appId,
            id
        });

        res.json({
            recipeRecordsDeleted,
            info: {
                message: TITLE_DELETE_SUCCESS
            }
        });
    } catch (e) {
        if (e instanceof Error) {
            const errorMessage = {
                title: TITLE_RECIPE_ERROR,
                info: {
                    message: e.message
                }
            };
            res.send(errorMessage);
        }
    }
});

module.exports = recipeController;