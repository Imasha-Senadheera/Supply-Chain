const neo4j = require('neo4j-driver');

const manufacturerResolvers = {
  Query: {
    manufacturers: async () => {
      const uri = 'bolt://localhost:7687';
      const username = 'neo4j';
      const password = 'Imasha@0326';
      const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

      const session = driver.session();
      const result = await session.run('MATCH (m:Manufacturer) RETURN m');
      session.close();
      driver.close();

      return result.records.map(record => record.get('m').properties);
    },
    hello: () => 'Hello World!'
  }
};

module.exports = { manufacturerResolvers };
