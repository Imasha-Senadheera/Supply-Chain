const { ApolloServer, gql } = require('apollo-server');

// Define your schema using SDL
const typeDefs = gql`
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
    supplies: [Supplier!]!
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
    manufacturer: Manufacturer!
    distributor: Distributor!
  }

  type Mutation {
    createSupplier(supplierInput: SupplierInput): Supplier
    createManufacturer(manufacturerInput: ManufacturerInput): Manufacturer
    createDistributor(distributorInput: DistributorInput): Distributor
    createProduct(productInput: ProductInput): Product
  }

  input SupplierInput {
    name: String!
    material: String!
    location: String!
  }

  input ManufacturerInput {
    name: String!
    product: String!
    location: String!
  }

  input DistributorInput {
    name: String!
    region: String!
  }

  input ProductInput {
    name: String!
    category: String!
    manufacturingCost: Float!
    manufacturerID: ID!
    distributorID: ID!
  }
`;

// Implement resolvers
const resolvers = {
  Mutation: {
    createSupplier: (_, { supplierInput }) => {
      // Logic to create a new supplier
    },
    createManufacturer: (_, { manufacturerInput }) => {
      // Logic to create a new manufacturer
    },
    createDistributor: (_, { distributorInput }) => {
      // Logic to create a new distributor
    },
    createProduct: (_, { productInput }) => {
      // Logic to create a new product
    },
  },
};

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
