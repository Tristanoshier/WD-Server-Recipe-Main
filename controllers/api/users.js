const Services = require('../../services');
const {
  INCORRECT_EMAIL_PASSWORD,
  GROUP_API_NOT_FOUND,
  USER_CREATED,
  USER_FOUND,
  TITLE_LOGIN_ERROR,
  TITLE_SIGNUP_ERROR
} = require('../constants');
const validateApiKey = require('../../middlewares/validateApiKey');

const userController = require('express').Router();

userController.route('/login').post(validateApiKey, async (req, res) => {
  try {
    const { email, password } = req.body;

    const { apiKey, appId } = req;

    if (!email || !password) throw new Error(INCORRECT_EMAIL_PASSWORD);

    const foundUser = await Services.user.get(email);

    if (!foundUser) throw new Error(INCORRECT_EMAIL_PASSWORD);
    if (!(await Services.password.validatePassword(password, foundUser.password)))
      throw new Error(INCORRECT_EMAIL_PASSWORD);
    const userId = foundUser?.id;
    const token = await Services.jwt.createSessionToken(userId, { apiKey, appId });

    res.json({
      userId,
      token,
      info: {
        message: USER_FOUND
      }
    });
  } catch (e) {
    if (e instanceof Error) {
      const errorMessage = {
        title: TITLE_LOGIN_ERROR,
        info: {
          message: e.message
        }
      };
      res.send(errorMessage);
    }
  }
});

userController.route('/signup').post(validateApiKey, async (req, res) => {
  try {
    const { email, password } = req.body;
    const { appId } = req;

    if (!email || !password) throw new Error(INCORRECT_EMAIL_PASSWORD);

    const hashedPassword = await Services.password.hashPassword(password);
    const userId = await Services.user.create({ email, password: hashedPassword, appId });

    res.json({
      userId,
      info: {
        message: USER_CREATED
      }
    });
  } catch (e) {
    if (e instanceof Error) {
      const errorMessage = {
        title: TITLE_SIGNUP_ERROR,
        info: {
          message: e.message === 'Validation error' ? e.original.detail : e.message
        }
      };
      res.send(errorMessage);
    }
  }
});

module.exports = userController;
