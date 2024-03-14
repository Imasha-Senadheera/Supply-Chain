const { mergeResolvers } = require('@graphql-tools/merge');
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
        console.error('Error fetching manufacturers:', error);
        throw error;
      }
    },
    hello: () => 'Hello World!'
  },
  Mutation: {
    createManufacturer: async (_, { manufacturerInput }) => {
      try {
        const uri = 'bolt://localhost:7687';
        const username = 'neo4j';
        const password = 'Imasha@0326';
        const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

        const session = driver.session();

        const { name, product, location } = manufacturerInput;

        // Example Cypher query to create a new manufacturer node
        const result = await session.run(
          `CREATE (m:Manufacturer {name: $name, product: $product, location: $location}) RETURN m`,
          { name, product, location }
        );

        const createdManufacturer = result.records[0].get('m').properties;

        session.close();
        driver.close();

        return createdManufacturer;
      } catch (error) {
        console.error('Error creating manufacturer:', error);
        throw error;
      }
    }
  }
};

// Merge the resolvers
const mergedResolvers = mergeResolvers([manufacturersResolvers]);

module.exports = mergedResolvers;
