const services = require('../../services');
const middlewares = require('../../middlewares');

const dashboardGroupController = require('express').Router();

dashboardGroupController
  .route('/new')
  .get(async (_, res) => {
    const renderData = {
      title: 'New Group',
      is_authed: true,
    }
    res.render('pages/group/new.html', renderData);
  })
  .post(async (req, res) => {
    try {
      let { name } = req.body;
      let newGroup = await services.group.create(name);
      await services.membership.create(req.user.id, newGroup.id);
      res.redirect('/dashboard');
    } catch (e) {
      console.log(e);
      const renderData = {
        title: 'New Group',
        is_authed: true,
        info: {
          message: 'Failed to create group!'
        }
      }
      res.render('pages/group/new.html', renderData)
    }
  });

dashboardGroupController
  .route('/detail/:id')
  .get(middlewares.checkMembership, async (req, res) => {
    const { id } = req.params;
    let group = await services.group.getOne(id);
    let memberships = await services.membership.groupMemberships(id);
    let members = await services.client.getAllById(memberships.map(x => x.clientId));
    let apiKeys = await services.apiKey.getGroupKeys(id);
    const renderData = {
      title: 'Group Detail',
      is_authed: true,
      name: group.name,
      groupId: group.id,
      members: members.map(x => ({name: x.name, id: x.id })),
      api_keys: apiKeys,
      create_url: `/dashboard/key/create/${id}`,
      add_member_url: `/dashboard/group/${id}/addmember`
    }
    res.render('pages/group/detail', renderData);
  });



dashboardGroupController
  .route('/:id/addmember')
  .get(middlewares.checkMembership, async (req, res) => {
    try {
      let group = await services.group.getOne(req.params.id);
      const renderData = {
        title: 'Group Detail',
        is_authed: true,
        group_detail_url: `/dashboard/group/detail/${ req.params.id }`
      }
      res.render('pages/group/addMember', renderData);
    } catch (e) {
      res.redirect(`/dashboard/group/detail/${ req.params.id }`);
    }
  })
  .post(middlewares.checkMembership, async (req, res) => {
    const { id } = req.params;
    let errorMessage;
    try {
      const { email } = req.body;

      const foundClient = await services.client.get(email);
      if (!foundClient) {
        errorMessage = "Cannot add User to the group"
        throw new Error();
      }

      const group = await services.group.getOne(id);
      if (!group)
        res.redirect('/dashboard');

      if(await services.membership.checkMembership(foundClient.id, group.id)) {
        errorMessage = "User already a member of the group!"
      }
      
      let newMembership = await services.membership.create(foundClient.id, group.id);
      if (!newMembership)
        throw new Error();

      res.redirect(`/dashboard/group/detail/${ id }`);

    } catch (e) {
      const renderData = {
        title: 'Add Member',
        is_authed: true,
        group_detail_url: `/dashboard/group/detail/${ id }`,
        info: {
          message: errorMessage ? errorMessage : "Unable to add member",
        }
      }
      res.render('pages/group/addMember', renderData);
    }
  });

  dashboardGroupController
    .route('/:id/removemember/:userId')
    .get(middlewares.checkMembership, (req, res) => {
      const renderData = {
        title: 'Remove Member',
        is_authed: true,
        group_detail_url: `/dashboard/group/detail/${ req.params.id }`
      }
      res.render('pages/group/removeConfirm', renderData);
    })
    .post(middlewares.checkMembership, async (req, res) => {
      const { id: groupId, userId } = req.params;
      try {
        if (await services.membership.checkMembership(userId, groupId))
          await services.membership.removeMembership(groupId, userId);

        res.redirect(`/dashboard/group/detail/${ groupId }`);
      } catch (e) {
        res.redirect(`/dashboard/group/detail/${ groupId }`);
      }
    })

module.exports = dashboardGroupController;