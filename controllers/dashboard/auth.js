const dashboardAuthController = require('express').Router();
const Services = require('../../services');
const {
  INCORRECT_EMAIL_PASSWORD,
  FAILED_TO_REGISTER_CLIENT,
  PASSWORDS_DO_NOT_MATCH,
  EMAIL_ALREADY_IN_USE
} = require('../constants');

/* ===== Login Routes ===== */
dashboardAuthController
  .route('/login')
  .get((_, res) => {
    // TODO: Implement CSRF tokens
    const renderData = {
      title: 'Login'
    };
    res.render('pages/auth/login.html', renderData);
  })
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw new Error(INCORRECT_EMAIL_PASSWORD);

      const foundClient = await Services.client.get(email);

      if (!foundClient) throw new Error(INCORRECT_EMAIL_PASSWORD);
      if (!(await Services.password.validatePassword(password, foundClient.password)))
        throw new Error(INCORRECT_EMAIL_PASSWORD);

      res
        .cookie('authorization', await Services.jwt.createSessionToken(foundClient.id))
        .redirect('/dashboard');
    } catch (e) {
      if (e instanceof Error) {
        const renderData = {
          title: 'Login',
          info: {
            message: e.message
          }
        };
        res.render('pages/auth/login.html', renderData);
      }
    }
  });

/* ===== Register Routes ===== */
dashboardAuthController
  .route('/register')
  .get((_, res) => {
    // TODO: Implement CSRF tokens
    const renderData = {
      title: 'Register'
    };
    res.render('pages/auth/register.html', renderData);
  })
  .post(async (req, res) => {
    try {
      let { clientName, email, password, verifyPassword } = req.body;
      if (!email || !password) {
        throw new Error(FAILED_TO_REGISTER_CLIENT);
      } else if (password !== verifyPassword) {
        throw new Error(PASSWORDS_DO_NOT_MATCH);
      }
      password = await Services.password.hashPassword(password);
      const newClient = await Services.client.create(clientName, email, password);
      if (!newClient) throw new Error(EMAIL_ALREADY_IN_USE);
      res
        .cookie('authorization', Services.jwt.createSessionToken(newClient.id))
        .redirect('/dashboard');
    } catch (e) {
      let renderData = {
        title: 'Register'
      };
      if (e instanceof Error) {
        renderData = {
          info: {
            message: e.message
          },
          ...renderData
        };
      } else {
        renderData = {
          info: {
            message: FAILED_TO_REGISTER_CLIENT
          }
        };
      }
      res.render('pages/auth/register.html', renderData);
    }
  });

dashboardAuthController.all('/logout', (_, res) => {
  res.cookie('authorization', '', { maxAge: Date.now() });
  res.redirect('/');
});

module.exports = dashboardAuthController;
