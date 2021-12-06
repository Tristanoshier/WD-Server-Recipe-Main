const { jwt, client } = require('../services');

module.exports = async (req, res, next) => {
  try {
    const result = await jwt.verifyJWT(req.cookies.authorization);
    if (result) {
      req.user = await client.getById(result.userId); // TODO: Update this with the procedure for attaching a user
      next();
    } else {
      res.cookie('authorization', '', { maxAge: Date.now() });
      res.redirect('/dashboard/login');
    }
  } catch (e) {
    res.cookie('authorization', '', { maxAge: Date.now() });
    res.status(401).redirect('/dashboard/login');
  }
};
