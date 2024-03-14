// manufacturersResolvers.js
const { driver } = require('../../src/neo4j');

const manufacturersResolvers = {
  Query: {
    manufacturers: async () => {
      const session = driver.session();
      const result = await session.run('MATCH (m:Manufacturer) RETURN m');
      session.close();
      return result.records.map(record => record.get('m').properties);
    }
  }
};

module.exports = { manufacturersResolvers };
