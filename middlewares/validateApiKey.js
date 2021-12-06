const Services = require('../services');
const { APIKEY_ERROR, MISSING_API_KEY, GROUP_API_NOT_FOUND } = require('../controllers/constants');

module.exports = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) throw new Error(MISSING_API_KEY);
    const appId = await Services.apiKey.verifyApiKey(apiKey);
    if (!appId) throw new Error(GROUP_API_NOT_FOUND);
    req.appId = appId;
    req.apiKey = apiKey;
    next();
  } catch (e) {
    if (e instanceof Error) {
      const errorMessage = {
        title: APIKEY_ERROR,
        info: {
          message: e.message
        }
      };
      res.send(errorMessage);
    }
  }
};
