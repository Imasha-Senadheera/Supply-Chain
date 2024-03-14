const { driver } = require('./neo4j');

const suppliersResolvers = {
  Query: {
    suppliers: async () => {
      const session = driver.session();
      const result = await session.run('MATCH (s:Supplier) RETURN s');
      session.close();
      return result.records.map(record => record.get('s').properties);
    }
  }
};

module.exports = { suppliersResolvers };
