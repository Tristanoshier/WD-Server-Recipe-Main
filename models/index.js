const { ApiKey, Client, Group, Membership } = require('./dashboard');
const { User, Profile } = require('./api');

// Associations go here!

// Dashboard Associations
Group.hasMany(ApiKey);
ApiKey.belongsTo(Group, {
  foreignKey: 'groupId'
});
Client.belongsToMany(Group, { through: Membership });
Group.belongsToMany(Client, { through: Membership });

// Application Associations
User.belongsTo(ApiKey, {
  foreignKey: 'appId'
});
ApiKey.hasMany(User);

Profile.belongsTo(User, {
  foreignKey: 'userId'
});
User.hasOne(Profile);

module.exports = {
  ApiKey,
  Client,
  Group,
  Membership,
  User,
  Profile
};
