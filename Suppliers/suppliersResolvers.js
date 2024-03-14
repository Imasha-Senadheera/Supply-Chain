const { mergeResolvers } = require('@graphql-tools/merge');
const neo4j = require('neo4j-driver');

const suppliersResolvers = {
  Query: {
    suppliers: async (_, __, { dataSources }) => {
      try {
        const uri = 'bolt://localhost:7687';
        const username = 'neo4j';
        const password = 'Imasha@0326';
        const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

        const session = driver.session();
        const result = await session.run('MATCH (s:Supplier) RETURN s');
        
        const suppliers = result.records.map(record => record.get('s').properties);
        
        session.close();
        driver.close();

        return suppliers;
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw error;
      }
    }
  },
  Mutation: {
    createSupplier: async (_, { supplierInput }, { dataSources }) => {
      return dataSources.supplierAPI.createSupplier(supplierInput);
    },
  },
};

module.exports = suppliersResolvers;
