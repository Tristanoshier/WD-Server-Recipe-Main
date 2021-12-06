const services = require('../../services');

const apikeyController = require('express').Router();

apikeyController
  .route('/create/:groupid')
  .get(async (req, res) => {
    const { groupid } = req.params;
    const renderData = {
      title: 'Create API Key',
      is_authed: true,
      group_detail_url: `/dashboard/group/detail/${groupid}`,
    }
    res.render('pages/apikey/create.html', renderData);
  })
  .post(async (req, res) => {
    try {
      let { name } = req.body;
      let { groupid } = req.params;
      await services.apiKey.create(name, groupid);
      res.redirect(`/dashboard/group/detail/${ groupid }`);
    } catch (e) {
      console.log(e);
      const renderData = {
        title: 'Create API Key',
        is_authed: true,
        group_detail_url: `/dashboard/group/detail/${groupid}`,
        info: {
          message: 'Failed to create Api Key!'
        }
      }
      res.render('pages/group/new.html', renderData);
    }
  });

module.exports = apikeyController;