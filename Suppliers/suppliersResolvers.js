const { ApolloError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { RateLimiterMemory } = require('rate-limiter-flexible');
const neo4j = require('neo4j-driver');

const rateLimiter = new RateLimiterMemory({
  points: 100,
  duration: 60,
});

let latestId = 0; // Assuming you want to track the latest ID for new suppliers

const suppliersResolvers = {
  Query: {
    suppliers: async (_, __, { driver }) => {
      try {
        const session = driver.session();
        const result = await session.run('MATCH (s:Supplier) RETURN s');
        const suppliers = result.records.map(record => record.get('s').properties);
        session.close();
        return suppliers;
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw new ApolloError('Failed to fetch suppliers', 'SUPPLIERS_FETCH_ERROR');
      }
    },
  },
  Mutation: {
    createSupplier: async (_, { supplierInput }, { driver }) => {
      const session = driver.session();
      try {
        const { name, location } = supplierInput;
        const result = await session.run(
          'CREATE (s:Supplier {name: $name, location: $location}) RETURN s',
          { name, location }
        );
        const createdSupplier = result.records[0].get('s').properties;
        session.close();
        return createdSupplier;
      } catch (error) {
        console.error('Error creating supplier:', error);
        throw new ApolloError('Failed to create supplier', 'CREATE_SUPPLIER_ERROR');
      }
    },
    registerSupplier: async (_, { name, location }, { driver }) => {
      const session = driver.session();
      try {
        // Implement any necessary business logic for registration
        latestId++;
        const result = await session.run(
          'CREATE (s:Supplier {ID: $id, name: $name, location: $location}) RETURN s',
          { id: latestId, name, location }
        );
        const createdSupplier = result.records[0].get('s').properties;
        session.close();
        return createdSupplier;
      } catch (error) {
        console.error('Error registering supplier:', error);
        throw new ApolloError('Failed to register supplier', 'REGISTER_SUPPLIER_ERROR');
      }
    },
    updateSupplier: async (_, { id, name, location }, { driver }) => {
      const session = driver.session();
      try {
        // Implement any necessary business logic for updating
        const result = await session.run(
          'MATCH (s:Supplier {ID: $id}) SET s.name = $name, s.location = $location RETURN s',
          { id, name, location }
        );
        const updatedSupplier = result.records[0].get('s').properties;
        session.close();
        return updatedSupplier;
      } catch (error) {
        console.error('Error updating supplier:', error);
        throw new ApolloError('Failed to update supplier', 'UPDATE_SUPPLIER_ERROR');
      }
    },
    deleteSupplier: async (_, { id }, { driver }) => {
      const session = driver.session();
      try {
        // Implement any necessary business logic for deletion
        await session.run('MATCH (s:Supplier {ID: $id}) DELETE s', { id });
        session.close();
        return true;
      } catch (error) {
        console.error('Error deleting supplier:', error);
        throw new ApolloError('Failed to delete supplier', 'DELETE_SUPPLIER_ERROR');
      }
    },
  },
};

module.exports = suppliersResolvers;
