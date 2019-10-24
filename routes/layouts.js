var {registryResource} = require('../resources/registry');

const footerHeaderValues = async (req, res) => {
  let careProviderName = (await registryResource.byId(res.app.get('careProviderId'))).name
  return {careProviderName}
};

module.exports = {footerHeaderValues}