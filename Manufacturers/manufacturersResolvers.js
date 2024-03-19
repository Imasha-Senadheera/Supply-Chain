const { ApolloError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { RateLimiterMemory } = require('rate-limiter-flexible');
const neo4j = require('neo4j-driver');

const rateLimiter = new RateLimiterMemory({
  points: 100,
  duration: 60,
});

let latestId = 0; // Assuming you want to track the latest ID for new manufacturers

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
    },
  },
  Mutation: {
    createManufacturer: async (_, { manufacturerInput }, { driver }) => {
      const session = driver.session();
      try {
        const { name, product, location } = manufacturerInput;
        const result = await session.run(
          'CREATE (m:Manufacturer {name: $name, product: $product, location: $location}) RETURN m',
          { name, product, location }
        );
        const createdManufacturer = result.records[0].get('m').properties;
        session.close();
        return createdManufacturer;
      } catch (error) {
        console.error('Error creating manufacturer:', error);
        throw new ApolloError('Failed to create manufacturer', 'CREATE_MANUFACTURER_ERROR');
      }
    },
    registerManufacturer: async (_, { name, product, location }, { driver }) => {
      const session = driver.session();
      try {
        // Implement any necessary business logic for registration
        latestId++;
        const result = await session.run(
          'CREATE (m:Manufacturer {ID: $id, name: $name, product: $product, location: $location}) RETURN m',
          { id: latestId, name, product, location }
        );
        const createdManufacturer = result.records[0].get('m').properties;
        session.close();
        return createdManufacturer;
      } catch (error) {
        console.error('Error registering manufacturer:', error);
        throw new ApolloError('Failed to register manufacturer', 'REGISTER_MANUFACTURER_ERROR');
      }
    },
    updateManufacturer: async (_, { id, name, product, location }, { driver }) => {
      const session = driver.session();
      try {
        // Implement any necessary business logic for updating
        const result = await session.run(
          'MATCH (m:Manufacturer {ID: $id}) SET m.name = $name, m.product = $product, m.location = $location RETURN m',
          { id, name, product, location }
        );
        const updatedManufacturer = result.records[0].get('m').properties;
        session.close();
        return updatedManufacturer;
      } catch (error) {
        console.error('Error updating manufacturer:', error);
        throw new ApolloError('Failed to update manufacturer', 'UPDATE_MANUFACTURER_ERROR');
      }
    },
    deleteManufacturer: async (_, { id }, { driver }) => {
      const session = driver.session();
      try {
        // Implement any necessary business logic for deletion
        await session.run('MATCH (m:Manufacturer {ID: $id}) DELETE m', { id });
        session.close();
        return true;
      } catch (error) {
        console.error('Error deleting manufacturer:', error);
        throw new ApolloError('Failed to delete manufacturer', 'DELETE_MANUFACTURER_ERROR');
      }
    },
  },
};

module.exports = manufacturersResolvers;
