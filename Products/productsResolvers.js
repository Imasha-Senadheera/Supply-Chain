const { ApolloError } = require('apollo-server');
const neo4j = require('neo4j-driver');

const productsResolvers = {
  Query: {
    products: async (_, __, { driver }) => {
      try {
        const session = driver.session();
        const result = await session.run('MATCH (p:Product) RETURN p');
        
        // Transforming Neo4j records into the desired response format
        const products = result.records.map(record => {
          const { productID, name, category, manufacturingCost } = record.get('p').properties;
          return {
            productID,
            name,
            category,
            manufacturingCost: parseFloat(manufacturingCost),
          };
        });
        
        session.close();

        return products;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw new ApolloError('Failed to fetch products', 'PRODUCTS_FETCH_ERROR');
      }
    }
  }
};

module.exports = productsResolvers;
