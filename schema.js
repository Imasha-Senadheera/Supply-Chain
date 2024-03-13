const { gql } = require('apollo-server');

const schema = gql`
  type Query {
    suppliers: [Supplier]
    manufacturers: [Manufacturer]
    distributors: [Distributor]
    products: [Product]
  }

  type Supplier {
    supplierID: ID!
    name: String!
    material: String!
    location: String!
  }

  type Manufacturer {
    manufacturerID: ID!
    name: String!
    product: String!
    location: String!
  }

  type Distributor {
    distributorID: ID!
    name: String!
    region: String!
  }

  type Product {
    productID: ID!
    name: String!
    category: String!
    manufacturingCost: Float!
  }
`;

module.exports = { schema };
