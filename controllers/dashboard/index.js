const { dashboardAuth } = require('../../middlewares');
const dashboardController = require('express').Router();
const Services = require('../../services');

dashboardController.use('/group', dashboardAuth, require('./groups'));
dashboardController.use('/key', dashboardAuth, require('./apikeys'));
dashboardController.use('/images', dashboardAuth, require('./unsplash'));
dashboardController.use('', require('./auth'));

// ---- BASE ROUTE ----
dashboardController.get('/', dashboardAuth, async (req, res) => {
  // The base home page of the dashboard should show a list of groups you are in
  const { user } = req;
  try {
    // Find all memberships, and pull the group for each.
    const memberships = await Services.membership.clientMemberships(user.id);
    console.log(memberships);
    const groups = memberships 
      ? await Services.group.getAllByIds(memberships.map(x => x.groupId))
      : [];
    const renderData = {
      title: "API Dashboard",
      is_authed: true,
      groups: groups.map(x => ({ id: x.id, name: x.name }))
    };
    res.render('pages/home.html', renderData);
  } catch (e) {
    console.log(e);
    res.redirect('/dashboard/login');
  }
});

module.exports = dashboardController;
