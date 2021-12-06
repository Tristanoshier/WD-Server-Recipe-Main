const apiController = require('express').Router();

// Implement the program's API logic here.
apiController.use('/user', require('./users'));
apiController.use('/profile', require('./profile'));
// apiController.use('/recipe', require('./recipe'));

module.exports = apiController;
