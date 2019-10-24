axios = require('axios');

const registryEndpoint = 'http://localhost:11323';
const organizationsPath = '/api/organizations';
const organizationPath = '/api/organization';

const registryResource = class {
  static async byId(id) {
    try {
      let res = await axios.get(registryEndpoint + organizationPath + '/' + id)
      return res.data
    } catch (e) {
      console.log(e)
    }
    return null
  }

  static async search(query) {
    try {
      let res = await axios.get(registryEndpoint + organizationsPath, {params: {query}})
      if (res.status == 200) {
        console.log(res.data)
        return res.data
      }
    } catch (e) {
      console.log(e)
    }

    return []
  }

};

module.exports = {registryResource};