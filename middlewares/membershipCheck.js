const { membership } = require('../services');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!(await membership.checkMembership(req.user.id, id))) {
      res.status(401).redirect('/dashboard');
      return;
    }
    next();
  } catch (e) {
    res.status(500).redirect('/dashboard');
  }
}