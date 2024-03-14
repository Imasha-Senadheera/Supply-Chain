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
