const { ApolloServer, gql } = require('apollo-server');

// Define your schema using SDL
const typeDefs = gql`
  type Query {
    hello: String!
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
  Query: {
    // Implement your query resolvers here
  },
  Mutation: {
    createSupplier: (_, { supplierInput }) => {
      // Placeholder logic to create a new supplier
      const newSupplier = {
        supplierID: '123',
        ...supplierInput
      };
      return newSupplier;
    },
    createManufacturer: (_, { manufacturerInput }) => {
      // Placeholder logic to create a new manufacturer
      const newManufacturer = {
        manufacturerID: '456',
        ...manufacturerInput
      };
      return newManufacturer;
    },
    createDistributor: (_, { distributorInput }) => {
      // Placeholder logic to create a new distributor
      const newDistributor = {
        distributorID: '789',
        ...distributorInput
      };
      return newDistributor;
    },
    createProduct: (_, { productInput }) => {
      // Placeholder logic to create a new product
      const newProduct = {
        productID: '321',
        ...productInput
      };
      return newProduct;
    },
  },
};

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
