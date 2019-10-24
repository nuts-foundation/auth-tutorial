const express = require('express');
const router = express.Router();
const {patientResource} = require('../resources/patients');
const {registryResource} = require('../resources/registry');
const {consentResource} = require('../resources/consent-store');
const {registerConsent} = require('../resources/consent-logic');
const {nutsAuthClient} = require('@nuts-foundation/auth');

router.all('*', async (req, res, next) => {
  const client = nutsAuthClient('http://localhost:11323', 'Demo EHR');
  let validationResponse;
  const nutsToken = req.cookies['nutstoken']
  console.log(nutsToken, req.cookies)

  try {
    validationResponse = await client.validateToken(nutsToken);
  } catch (e) {
    console.log(e)
    return res.status(500).send(`unable to verify token. ${e}`)
  }

  const sessionIsValid = validationResponse.validation_result === "VALID";

  if (!sessionIsValid) {
    res.status(403).send("token invalid");
    return;
  }

  next()
});

router.get('/', async (req, res, next) => {
  const careProviderName = (await registryResource.byId(res.app.get('careProviderId'))).name
  const patients = patientResource.all();
  res.render('patients', {patients, careProviderName})
});

router.post('/:id/consent', async (req, res, next) => {
  const patientId = req.params.id;
  const patient = patientResource.byId(patientId);

  console.log("post body:", req.body);
  console.log("post params:", req.params);

  const custodian = req.app.get('careProviderId');
  const actor = req.body.externalCareProvider;
  const subject = `urn:oid:2.16.840.1.113883.2.4.6.3:${patient.bsn}`;
  const performer = `urn:oid:2.16.840.1.113883.2.4.6.1:${req.cookies.agb}`;
  const validFrom = new Date().toJSON();
  const validTo = new Date(new Date().setMonth(new Date().getMonth() + 12)).toJSON();

  try {
    await registerConsent(custodian, actor, subject, performer, validFrom, validTo);
    req.flash('notify', "consent created")
  } catch (e) {
    req.flash('error', "error while registering consent")
  }
  res.redirect(`/patients/${patientId}/consent`)
});

router.get('/:id/consent', async (req, res, next) => {
  const careProviderName = (await registryResource.byId(res.app.get('careProviderId'))).name;
  const patient = patientResource.byId(req.params.id);
  const careProviders = await registryResource.search('zorg');
  const otherCareProviders = careProviders.filter((careProvider) => careProvider.identifier != res.app.get('careProviderId'));
  let consents = await consentResource.findByBsn(patient.bsn, res.app.get('careProviderId'));
  const careProvidersWithoutConsent = otherCareProviders.filter((careProvider) => !consents.some((consent) => consent.actors[0] == careProvider.identifier))
  consents = await Promise.all(consents.map(async (consent) => {
    consent.actorName = (await registryResource.byId(consent.actors[0])).name;
    consent.custodianName = (await registryResource.byId(consent.custodian)).name;
    return consent
  }));
  res.render('patient-consent', {patient, careProvidersWithoutConsent, consents, careProviderName})
});

module.exports = router;
