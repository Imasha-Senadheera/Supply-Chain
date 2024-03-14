const neo4j = require('neo4j-driver');

const distributorsResolvers = {
  Query: {
    distributors: async () => {
      try {
        const uri = 'bolt://localhost:7687';
        const username = 'neo4j';
        const password = 'Imasha@0326';
        const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

        const session = driver.session();
        const result = await session.run('MATCH (d:Distributor) RETURN d');
        
        const distributors = result.records.map(record => record.get('d').properties);
        
        session.close();
        driver.close();

        return distributors;
      } catch (error) {
        console.error('Error fetching distributors:', error);
        throw error;
      }
    },
    sayHello: () => {
      return 'Hello World!';
    }
  }
};

module.exports = { distributorsResolvers };
