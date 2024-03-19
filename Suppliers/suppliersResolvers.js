const neo4j = require('neo4j-driver');

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
        throw error;
      }
    }
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
        throw error;
      }
    },
  },
};

module.exports = suppliersResolvers;
