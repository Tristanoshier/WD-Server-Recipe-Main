module.exports = {
  dashboardAuth: require('./validateDashboardSession'),
  checkMembership: require('./membershipCheck'),
  validateAPIkey: require('./validateApiKey'),
  validateSession: require('./validateSession')
};
