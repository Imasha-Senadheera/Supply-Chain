// manufacturersDefs.js

const { gql } = require('apollo-server');

const manufacturersDefs = gql`
  type Manufacturer {
    manufacturerID: String!
    name: String!
    product: String!
    location: String!
  }

  type Query {
    manufacturers: [Manufacturer!]!
  }

  type Mutation {
    createManufacturer(name: String!, product: String!, location: String!): Manufacturer!
  }
`;

module.exports = manufacturersDefs;
