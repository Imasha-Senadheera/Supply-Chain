// distributorsResolvers.js
const { driver } = require('../../src/neo4j');

const distributorsResolvers = {
  Query: {
    distributors: async () => {
      const session = driver.session();
      const result = await session.run('MATCH (d:Distributor) RETURN d');
      session.close();
      return result.records.map(record => record.get('d').properties);
    }
  }
};

module.exports = { distributorsResolvers };
