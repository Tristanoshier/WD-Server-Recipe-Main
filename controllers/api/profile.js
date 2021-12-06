const Services = require("../../services");
const middlewares = require("../../middlewares");

const validateApiKey = require("../../middlewares/validateApiKey");
const validateSession = require("../../middlewares/validateSession");
const { validateDate } = require("../../services/helpers");
const {
  GET_SUCCESS,
  PROFILE_ERROR,
  TITLE_UPDATE_SUCCESS,
} = require("../constants");

const profileController = require("express").Router();

profileController
  .route("/get")
  .get(validateApiKey, validateSession, async (req, res) => {
    try {
      const ownerId = req.userId;
      const { apiKey } = req;
      const appId = await Services.apiKey.verifyApiKey(apiKey);
      if (!appId) throw new Error(GROUP_API_NOT_FOUND);

      const user = await Services.profile.get(ownerId);

      res.json({
        user,
        info: {
          message: GET_SUCCESS,
        },
      });
    } catch (e) {
      if (e instanceof Error) {
        const errorMessage = {
          title: PROFILE_ERROR,
          info: {
            message: e.message,
          },
        };
        res.send(errorMessage);
      }
    }
  });

profileController
  .route("/get/:id")
  .get(validateApiKey, validateSession, async (req, res) => {
    try {
      const ownerId = req.params.id;
      const { apiKey } = req;
      const appId = await Services.apiKey.verifyApiKey(apiKey);
      if (!appId) throw new Error(GROUP_API_NOT_FOUND);

      const user = await Services.profile.getById({ appId, ownerId });

      res.json({
        user,
        info: {
          message: GET_SUCCESS,
        },
      });
    } catch (e) {
      if (e instanceof Error) {
        const errorMessage = {
          title: PROFILE_ERROR,
          info: {
            message: e.message,
          },
        };
        res.send(errorMessage);
      }
    }
  });

profileController
  .route("/update")
  .put(validateApiKey, validateSession, async (req, res) => {
    try {
      const { firstName, favoriteCuisine } = req.body;
      const userId = req.userId;
      const { apiKey } = req;
      const appId = await Services.apiKey.verifyApiKey(apiKey);
      if (!appId) throw new Error(GROUP_API_NOT_FOUND);
      const recordsUpdated = await Services.profile.modify({
        firstName,
        favoriteCuisine,
        userId,
      });

      res.json({
        recordsUpdated,
        info: {
          message: TITLE_UPDATE_SUCCESS,
        },
      });
    } catch (e) {
      if (e instanceof Error) {
        const errorMessage = {
          title: PROFILE_ERROR,
          info: {
            message: e.message,
          },
        };
        res.send(errorMessage);
      }
    }
  });

profileController
  .route("/delete/:id")
  .delete(validateApiKey, validateSession, async (req, res) => {
    try {
      const ownerId = req.userId;
      const { apiKey } = req;
      const { id } = req.params;
      const appId = await Services.apiKey.verifyApiKey(apiKey);
      if (!appId) throw new Error(GROUP_API_NOT_FOUND);

      const mealRecordsDeleted = await Services.meal.remove({
        ownerId,
        appId,
        id,
      });

      res.json({
        mealRecordsDeleted,
        info: {
          message: TITLE_DELETE_SUCCESS,
        },
      });
    } catch (e) {
      if (e instanceof Error) {
        const errorMessage = {
          title: TITLE_MEAL_ERROR,
          info: {
            message: e.message,
          },
        };
        res.send(errorMessage);
      }
    }
  });
module.exports = profileController;
