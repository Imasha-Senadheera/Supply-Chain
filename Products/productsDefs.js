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
    updateProduct(productID: String!, name: String!, category: String!, manufacturingCost: Float!): Product!
    deleteProduct(productID: String!): Boolean!
  }
`;

module.exports = productsDefs;
