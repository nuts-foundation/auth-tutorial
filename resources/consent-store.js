const axios = require('axios');

const consentEndpoint = 'http://localhost:11323';
const queryPath = '/consent/query';

const consentResource = class {

  static async findByBsn(bsn, careProviderId) {
    let consentsAsActorPromise = axios.post(consentEndpoint + queryPath, {
      query: `urn:oid:2.16.840.1.113883.2.4.6.3:${bsn}`,
      actor: careProviderId
    });
    let consentsAsCustodianPromise = axios.post(consentEndpoint + queryPath, {
      query: `urn:oid:2.16.840.1.113883.2.4.6.3:${bsn}`,
      custodian: careProviderId
    });
    let consentRules = [];
    try {
      const results = await Promise.all([consentsAsActorPromise, consentsAsCustodianPromise]);
      results.forEach((res) => {
        if (res.status == 200) {
          console.log("Consent query results:", res.data)
          consentRules = consentRules.concat(res.data.results || []);
        }
      })
    } catch (e) {
      console.log(e.response.data.message)
    }

    return consentRules;
  }

};

module.exports = {consentResource};