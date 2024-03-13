const { driver } = require('./neo4j');

const resolvers = {
  Query: {
    suppliers: async () => {
      const session = driver.session();
      const result = await session.run('MATCH (s:Supplier) RETURN s');
      session.close();
      return result.records.map(record => record.get('s').properties);
    },
    manufacturers: async () => {
      const session = driver.session();
      const result = await session.run('MATCH (m:Manufacturer) RETURN m');
      session.close();
      return result.records.map(record => record.get('m').properties);
    },
    distributors: async () => {
      const session = driver.session();
      const result = await session.run('MATCH (d:Distributor) RETURN d');
      session.close();
      return result.records.map(record => record.get('d').properties);
    },
    products: async () => {
      const session = driver.session();
      const result = await session.run('MATCH (p:Product) RETURN p');
      session.close();
      return result.records.map(record => record.get('p').properties);
    }
  }
};

module.exports = resolvers;
