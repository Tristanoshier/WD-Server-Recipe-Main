// Set all environment variables in the application
require('dotenv').config();

// Handle all constant imports
const Express = require('express'),
  cors = require('cors'),
  Nunjucks = require('nunjucks'),
  CookieParser = require('cookie-parser'),
  swaggerJsDoc = require('swagger-jsdoc'),
  swaggerUi = require('swagger-ui-express'),
  App = Express(),
  PORT = Number(process.env.PORT || 8080),
  HOST = process.env.HOST || '127.0.0.1',
  Db = require('./db'),
  Controllers = require('./controllers'),
  swaggerDocs = require('./openapi.json');
// Config = require('./config');

// Configure the View Engine
Nunjucks.configure('views', {
  autoescape: true,
  express: App
});

// Attach utilities used by express
App.set('view engine', 'html');
App.use(CookieParser());
App.use(Express.static('public'));
App.use(Express.json());
App.use(Express.urlencoded({ extended: true }));
App.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//
App.use('/dashboard', Controllers.dashboardController);

// API Routes should be CORS Enabled, but not Dashboard routes.
App.use('/api', cors(), Controllers.apiController);

App.get('/', (_, res) => {
  res.redirect('/dashboard');
});

const StartupServer = async () => {
  console.log('[node] Attempting to start server');
  try {
    await Db.authenticate();
    await Db.sync({ force: false });
    App.listen(PORT, HOST, () => {
      console.log(`[server] App is listening on ${HOST}:${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

StartupServer();
