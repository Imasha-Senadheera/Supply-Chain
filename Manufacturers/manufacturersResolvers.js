const neo4j = require('neo4j-driver');

const manufacturersResolvers = {
  Query: {
    manufacturers: async () => {
      try {
        const uri = 'bolt://localhost:7687';
        const username = 'neo4j';
        const password = 'Imasha@0326';
        const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

        const session = driver.session();
        const result = await session.run('MATCH (m:Manufacturer) RETURN m');
        
        const manufacturers = result.records.map(record => record.get('m').properties);
        
        session.close();
        driver.close();

        return manufacturers;
      } catch (error) {
        // Log the error or handle it appropriately
        console.error('Error fetching manufacturers:', error);
        throw error; // Rethrow the error to be handled by Apollo Server
      }
    },
    hello: () => 'Hello World!'
  }
};

module.exports = { manufacturersResolvers };
