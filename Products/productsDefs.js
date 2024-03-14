// productsDefs.js

const { gql } = require('apollo-server');

const productsDefs = gql`
  type Product {
    productID: String!
    name: String!
    category: String!
    manufacturingCost: Float!
  }

  type Query {
    products: [Product!]!
  }

  type Mutation {
    createProduct(name: String!, category: String!, manufacturingCost: Float!): Product!
  }
`;

module.exports = productsDefs;
