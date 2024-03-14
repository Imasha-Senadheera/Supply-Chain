const neo4j = require('neo4j-driver');

const suppliersResolvers = {
  Query: {
    suppliers: async () => {
      const uri = 'bolt://localhost:7687';
      const username = 'neo4j';
      const password = 'Imasha@0326';
      const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

      const session = driver.session();
      const result = await session.run('MATCH (s:Supplier) RETURN s');
      session.close();
      driver.close();

      return result.records.map(record => record.get('s').properties);
    },
    sayHello: () => 'Hello World!' 
  }
};

module.exports = { suppliersResolvers };
