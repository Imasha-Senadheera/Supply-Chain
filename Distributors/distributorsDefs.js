const { gql } = require('apollo-server-express');

const distributorsDefs = gql`
  type Distributor {
    distributorID: String!
    name: String!
    region: String!
    manufacturersDistributes: [Manufacturer!]! @relationship(type: "DISTRIBUTES", direction: IN)
  }

  type Query {
    distributors: [Distributor!]!
  }
`;

module.exports = distributorsDefs;
