const { gql } = require('apollo-server');

const distributorsDefs = gql`
  type Distributor {
    distributorID: String!
    name: String!
    location: String!
  }

  type Query {
    distributors: [Distributor!]!
  }

  type Mutation {
    createDistributor(name: String!, location: String!): Distributor!
    registerDistributor(name: String!, location: String!): Distributor!
    updateDistributor(id: String!, name: String!, location: String!): Distributor!
    deleteDistributor(id: String!): Boolean!
  }
`;

module.exports = distributorsDefs;
