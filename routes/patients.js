var express = require('express');
var router = express.Router();
var { patientResource } = require('../fhir-resources/patients');

router.get('/', (req, res, next) => {
  let patients = patientResource.all();
  res.render('patients', {patients})
});

module.exports = router;
