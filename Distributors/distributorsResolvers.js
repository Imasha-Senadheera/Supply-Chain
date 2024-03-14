const neo4j = require('neo4j-driver');

const distributorsResolvers = {
  Query: {
    distributors: async () => {
      const uri = 'bolt://localhost:7687';
      const username = 'neo4j';
      const password = 'Imasha@0326';
      const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

      const session = driver.session();
      const result = await session.run('MATCH (d:Distributor) RETURN d');
      session.close();
      driver.close();

      return result.records.map(record => record.get('d').properties);
    }
  }
};

module.exports = { distributorsResolvers };
