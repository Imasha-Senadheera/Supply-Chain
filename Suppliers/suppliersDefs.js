const { gql } = require('apollo-server');

const suppliersDefs = gql`
  type Supplier {
    supplierID: String!
    name: String!
    material: String!
    location: String!
  }

  type Query {
    suppliers: [Supplier!]!
  }

  type Mutation {
    createSupplier(name: String!, material: String!, location: String!): Supplier!
    registerSupplier(name: String!, material: String!, location: String!): Supplier!
    updateSupplier(supplierID: String!, name: String!, material: String!, location: String!): Supplier!
    deleteSupplier(supplierID: String!): Boolean!
  }
`;

module.exports = suppliersDefs;
