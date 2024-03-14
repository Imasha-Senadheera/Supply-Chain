const { mergeResolvers } = require('@graphql-tools/merge');
const neo4j = require('neo4j-driver');

const productsResolvers = {
  Query: {
    products: async () => {
      try {
        const uri = 'bolt://localhost:7687';
        const username = 'neo4j';
        const password = 'Imasha@0326';
        const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

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
        driver.close();

        return products;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    }
  }
};

module.exports = productsResolvers;
