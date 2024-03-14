// productsDefs.js
const { driver } = require('../../src/neo4j');
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
