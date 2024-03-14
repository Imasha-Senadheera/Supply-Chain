const { gql } = require('apollo-server-express');

const productsDefs = gql`
  type Product {
    productID: String!
    name: String!
    category: String!
    manufacturingCost: Float!
    manufacturersProduces: [Manufacturer!]! @relationship(type: "PRODUCES", direction: IN)
  }

  type Query {
    products: [Product!]!
  }
`;

module.exports = productsDefs;
