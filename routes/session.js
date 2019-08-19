var express = require('express');
var router = express.Router();
const { nutsAuthClient } = require('@nuts-foundation/auth');

router.get('/logout', function (req, res, next) {
  res.clearCookie('nutstoken')
  res.clearCookie('agb')
  res.redirect('/')
});

router.get('/login', function (req, res, next) {
  if ('nutstoken' in req.cookies) {
    return res.redirect('/users/')
  }
  return res.render('login');
});

router.post('/login', async function (req, res, next) {
  const nutsToken = req.body.nuts_auth_token

  const client = nutsAuthClient('http://localhost:11323', 'Demo EHR');
  const validationResponse = await client.validateToken(nutsToken);

  console.log(validationResponse);

  const sessionIsValid = validationResponse.validation_result === "VALID";

  if (!sessionIsValid) {
    res.status(403).send("token invalid");
    return;
  }

  // Store token in session information for one hour
  // Note: the cookie should be signed in production environments
  res.cookie('nutstoken', nutsToken, {maxAge: 60 * 60 * 1000});
  res.cookie('agb', validationResponse.signer_attributes['irma-demo.nuts.agb.agbcode'], {maxAge: 60 * 60 * 1000});

  res.status(200).send(validationResponse);
});

module.exports = router;
