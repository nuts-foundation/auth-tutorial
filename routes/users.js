var express = require('express');
var router = express.Router();

/* GET users listing. */
router.all('/', function(req, res, next) {
  // check if the cookie is set
  if ('nutstoken' in req.cookies) {
    next();
  } else {
    res.redirect('/session/login');
  }
});

// render the user page with the agb code
router.get('/', function (req, res, next) {
  const agb = req.cookies.agb;
  res.render('user', {agb});
});
module.exports = router;
