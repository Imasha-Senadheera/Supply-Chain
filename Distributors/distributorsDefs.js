// distributorsDefs.js
const { driver } = require('../../src/neo4j');
const { gql } = require('apollo-server');

const distributorsDefs = gql`
  type Query {
    distributors: [Distributor]
  }

  type Distributor {
    distributorID: ID!
    name: String!
    region: String!
  }
`;

module.exports = { distributorsDefs };
