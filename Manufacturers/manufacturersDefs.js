const manufacturersDefs = gql`
  type Manufacturer {
    manufacturerID: String!
    name: String!
    product: String!
    location: String!
    suppliersSupplies: [Supplier!]! @relationship(type: "SUPPLIES", direction: IN)
    producesProducts: [Product!]! @relationship(type: "PRODUCES", direction: OUT)
    distributesDistributors: [Distributor!]! @relationship(type: "DISTRIBUTES", direction: OUT)
  }

  type Query {
    manufacturers: [Manufacturer!]!
  }
`;

module.exports = manufacturersDefs;
