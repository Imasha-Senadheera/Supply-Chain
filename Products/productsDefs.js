const { gql } = require('apollo-server');

const productsDefs = gql`
  type Query {
    products: [Product]
  }

  type Product {
    productID: ID!
    name: String!
    category: String!
    manufacturingCost: Float!
  }
`;

module.exports = { productsDefs };
