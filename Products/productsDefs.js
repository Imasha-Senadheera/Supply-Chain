const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    productID: String!
    name: String!
    category: String!
    manufacturingCost: Float!
    manufacturersProduces: [Manufacturer!]! @relationship(type: "PRODUCES", direction: IN)
  }

  type Query {
    _empty: String
  }
`;

module.exports = typeDefs;
