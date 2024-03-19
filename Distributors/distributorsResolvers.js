const { ApolloError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { RateLimiterMemory } = require('rate-limiter-flexible');
const neo4j = require('neo4j-driver');

const rateLimiter = new RateLimiterMemory({
  points: 100,
  duration: 60,
});

let latestId = 0; // Assuming you want to track the latest ID for new Distributor

const distributorsResolvers = {
  Query: {
    distributors: async (_, __, { driver }) => {
      try {
        const session = driver.session();
        const result = await session.run('MATCH (d:Distributor) RETURN d');
        const distributors = result.records.map(record => record.get('d').properties);
        session.close();
        return distributors;
      } catch (error) {
        console.error('Error fetching distributors:', error);
        throw new ApolloError('Failed to fetch distributors', 'DISTRIBUTORS_FETCH_ERROR');
      }
    }
  },
  Mutation: {
    createDistributor: async (_, { distributorInput }, { driver }) => {
      const session = driver.session();
      try {
        const { name, location } = distributorInput;
        const result = await session.run(
          'CREATE (d:Distributor {name: $name, location: $location}) RETURN d',
          { name, location }
        );
        const createdDistributor = result.records[0].get('d').properties;
        session.close();
        return createdDistributor;
      } catch (error) {
        console.error('Error creating distributor:', error);
        throw new ApolloError('Failed to create distributor', 'CREATE_DISTRIBUTOR_ERROR');
      }
    },
    registerDistributor: async (_, { name, location }, { driver }) => {
      const session = driver.session();
      try {
        // Implement any necessary business logic for registration
        latestId++;
        const result = await session.run(
          'CREATE (d:Distributor {ID: $id, name: $name, location: $location}) RETURN d',
          { id: latestId, name, location }
        );
        const createdDistributor = result.records[0].get('d').properties;
        session.close();
        return createdDistributor;
      } catch (error) {
        console.error('Error registering distributor:', error);
        throw new ApolloError('Failed to register distributor', 'REGISTER_DISTRIBUTOR_ERROR');
      }
    },
    updateDistributor: async (_, { id, name, location }, { driver }) => {
      const session = driver.session();
      try {
        // Implement any necessary business logic for updating
        const result = await session.run(
          'MATCH (d:Distributor {ID: $id}) SET d.name = $name, d.location = $location RETURN d',
          { id, name, location }
        );
        const updatedDistributor = result.records[0].get('d').properties;
        session.close();
        return updatedDistributor;
      } catch (error) {
        console.error('Error updating distributor:', error);
        throw new ApolloError('Failed to update distributor', 'UPDATE_DISTRIBUTOR_ERROR');
      }
    },
    deleteDistributor: async (_, { id }, { driver }) => {
      const session = driver.session();
      try {
        // Implement any necessary business logic for deletion
        await session.run('MATCH (d:Distributor {ID: $id}) DELETE d', { id });
        session.close();
        return true;
      } catch (error) {
        console.error('Error deleting distributor:', error);
        throw new ApolloError('Failed to delete distributor', 'DELETE_DISTRIBUTOR_ERROR');
      }
    },
  },
};

module.exports = distributorsResolvers;