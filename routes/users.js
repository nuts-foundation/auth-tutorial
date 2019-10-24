var express = require('express');
var router = express.Router();
var {registryResource} = require('../resources/registry');

/* GET users listing. */
router.all('/', function (req, res, next) {
  // check if the cookie is set
  if ('nutstoken' in req.cookies) {
    next();
  } else {
    res.redirect('/session/login');
  }
});

// render the user page with the agb code
router.get('/', async (req, res, next) => {
  let careProviderName = (await registryResource.byId(res.app.get('careProviderId'))).name
  const agb = req.cookies.agb;
  res.render('user', {agb, careProviderName});
});
module.exports = router;
