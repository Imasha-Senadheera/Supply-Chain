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
        
        const products = result.records.map(record => record.get('p').properties);
        
        session.close();
        driver.close();

        return products;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    },
    sayHello: () => {
      return 'Hello World!';
    }
  }
};

module.exports = { productsResolvers };
