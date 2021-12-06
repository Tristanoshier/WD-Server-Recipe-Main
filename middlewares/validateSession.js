const { INVALID_TOKEN, TOKEN_ERROR } = require('../controllers/constants');
const { jwt, client } = require('../services');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const result = await jwt.verifyJWT(token);
    if (result) {
      req.userId = result.userId; // TODO: Update this with the procedure for attaching a user
      next();
    } else {
      throw new Error(INVALID_TOKEN);
    }
  } catch (e) {
    if (e instanceof Error) {
      const errorMessage = {
        title: TOKEN_ERROR,
        info: {
          message: e.message
        }
      };
      res.send(errorMessage);
    }
  }
};
