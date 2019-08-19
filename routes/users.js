var express = require('express');
var router = express.Router();

/* GET users listing. */
router.all('/', function(req, res, next) {
  // res.render('user', {agb: req.cookies.agb})
  if ('nutstoken' in req.cookies) {
    next();
  } else {
    res.redirect('/session/login');
  }
});

router.get('/', function (req, res, next) {
  const agb = req.cookies.agb;
  res.render('user', {agb});
});

module.exports = router;
