const patient1 = require('../fhir-resources/patient1');
const patient2 = require('../fhir-resources/patient2');

module.exports = {
  patientResource: {
    all: ()=> {
      return [patient1, patient2];
    }
  }
};

