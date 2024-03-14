const { gql } = require('apollo-server-express');

const suppliersDefs = gql`
  type Supplier {
    supplierID: String!
    name: String!
    material: String!
    location: String!
    suppliesManufacturers: [Manufacturer!]!
  }

  type Query {
    suppliers: [Supplier!]!
  }
`;

module.exports = suppliersDefs;
