const { gql } = require('apollo-server');

const manufacturersDefs = gql`
  type Query {
    manufacturers: [Manufacturer]
  }

  type Manufacturer {
    manufacturerID: ID!
    name: String!
    product: String!
    location: String!
  }
`;

module.exports = { manufacturersDefs };
