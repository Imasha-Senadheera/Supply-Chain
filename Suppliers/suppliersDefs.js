const { gql } = require('apollo-server-express');

const schema = gql`
  type Supplier {
    supplierID: String!
    name: String!
    material: String!
    location: String!
    suppliesManufacturers: [Manufacturer!]! @relationship(type: "SUPPLIES", direction: OUT)
  }

  type Query {
    _empty: String
  }
`;

module.exports = { schema };
