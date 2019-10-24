const express = require('express');
const router = express.Router();
const {nutsAuthClient} = require('@nuts-foundation/auth');
const {footerHeaderValues} = require('./layouts');

router.get('/login', async (req, res, next) => {
  const {careProviderName} = await footerHeaderValues(req, res);
  res.render('login', {careProviderName})
});

router.post('/login', async (req, res, next) => {
  const nutsToken = req.body.nuts_auth_token

  const client = nutsAuthClient('http://localhost:11323', 'Demo EHR');
  let validationResponse
  try {
    validationResponse = await client.validateToken(nutsToken);
  } catch(e) {
    return res.status(500).send("unable to verify token. Is the nuts-node down?")
  }

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

router.get('/logout', function (req, res, next) {
  res.clearCookie('nutstoken')
  res.clearCookie('agb')
  res.redirect('/')
});

module.exports = router;
