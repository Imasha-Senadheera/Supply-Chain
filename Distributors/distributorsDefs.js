// distributorsDefs.js

const { gql } = require('apollo-server');

const distributorsDefs = gql`
  type Distributor {
    distributorID: String!
    name: String!
    region: String!
  }

  type Query {
    distributors: [Distributor!]!
  }

  type Mutation {
    createDistributor(name: String!, region: String!): Distributor!
  }
`;

module.exports = distributorsDefs;
