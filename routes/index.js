var express = require('express');
var router = express.Router();
var {registryResource} = require('../resources/registry');

/* GET home page. */
router.get('/', async (req, res, next) => {
  let careProviderName = (await registryResource.byId(res.app.get('careProviderId'))).name
  res.render('index', {title: 'Nuts Demo EHR', careProviderName});
});

module.exports = router;
