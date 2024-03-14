// productsResolvers.js
const { driver } = require('../../src/neo4j');

const productsResolvers = {
  Query: {
    products: async () => {
      const session = driver.session();
      const result = await session.run('MATCH (p:Product) RETURN p');
      session.close();
      return result.records.map(record => record.get('p').properties);
    }
  }
};

module.exports = { productsResolvers };
