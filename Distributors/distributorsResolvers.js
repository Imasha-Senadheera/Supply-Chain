const { ApolloError } = require('apollo-server');
const neo4j = require('neo4j-driver');

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
  }
};

module.exports = distributorsResolvers;
