const { ApolloError } = require('apollo-server');
const neo4j = require('neo4j-driver');

const manufacturersResolvers = {
  Query: {
    manufacturers: async (_, __, { driver }) => {
      try {
        const session = driver.session();
        const result = await session.run('MATCH (m:Manufacturer) RETURN m');
        
        const manufacturers = result.records.map(record => record.get('m').properties);
        
        session.close();

        return manufacturers;
      } catch (error) {
        console.error('Error fetching manufacturers:', error);
        throw new ApolloError('Failed to fetch manufacturers', 'MANUFACTURERS_FETCH_ERROR');
      }
    }
  },
  Mutation: {
    createManufacturer: async (_, { manufacturerInput }, { driver }) => {
      try {
        const session = driver.session();

        const { name, product, location } = manufacturerInput;

        // Example Cypher query to create a new manufacturer node
        const result = await session.run(
          `CREATE (m:Manufacturer {name: $name, product: $product, location: $location}) RETURN m`,
          { name, product, location }
        );

        const createdManufacturer = result.records[0].get('m').properties;

        session.close();

        return createdManufacturer;
      } catch (error) {
        console.error('Error creating manufacturer:', error);
        throw new ApolloError('Failed to create manufacturer', 'CREATE_MANUFACTURER_ERROR');
      }
    }
  }
};

module.exports = manufacturersResolvers;
