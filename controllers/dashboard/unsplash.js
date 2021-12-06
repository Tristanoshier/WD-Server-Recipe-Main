const fetch = require('node-fetch');
const imageController = require('express').Router();

imageController.get('/search/:term', async (req, res) => {
  const baseUrl = `https://api.unsplash.com/photos/?client_id=${ process.env.UNSPLASH_ACCESS_KEY }`
  try {
    let { term } = req.params;



  } catch (e) {
    res.json([]);
  }
});

module.exports = imageController;