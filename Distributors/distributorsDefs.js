const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Distributor {
    distributorID: String!
    name: String!
    region: String!
    manufacturersDistributes: [Manufacturer!]! @relationship(type: "DISTRIBUTES", direction: IN)
  }

  type Query {
    _empty: String
  }
`;

module.exports = typeDefs;
