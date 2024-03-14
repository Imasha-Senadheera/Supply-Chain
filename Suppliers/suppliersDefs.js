// suppliersDefs.js
const { driver } = require('../../src/neo4j');
const { gql } = require('apollo-server');

const suppliersDefs = gql`
  type Query {
    suppliers: [Supplier]
  }

  type Supplier {
    supplierID: ID!
    name: String!
    material: String!
    location: String!
  }
`;

module.exports = { suppliersDefs };
