const axios = require('axios');

const consentEndpoint = 'http://localhost:11323';
const consentPath = "/api/consent";

module.exports = {

  registerConsent: async (custodian, actor, subject, performer, validFrom, validTo) => {

    const payload = {
      subject: subject,
      custodian: custodian,
      actors: [actor],
      performer: performer,
      period: {
        start: validFrom,
        end: validTo,
      }
    };
    console.log("creating consent with", payload);

    try {
      const res = await axios.post(consentEndpoint + consentPath, payload);
      if (res.status == 202) {
        console.log("consent registered!");
        return res
      } else {
        console.log("something went wrong:", res.status, res);
      }
      return res
    } catch (e) {
      console.log("could not register consent:", e.response.data.message)
      throw "could not register consent"
    }
  }
};