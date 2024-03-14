const { ApolloServer } = require('apollo-server');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const fs = require('fs');
const path = require('path');

// Import the .graphql files
const suppliersTypeDefs = fs.readFileSync(path.join(__dirname, './Suppliers/suppliers.graphql'), 'utf-8');
const manufacturersTypeDefs = fs.readFileSync(path.join(__dirname, './Manufacturers/manufacturers.graphql'), 'utf-8');
const distributorsTypeDefs = fs.readFileSync(path.join(__dirname, './Distributors/distributors.graphql'), 'utf-8');
const productsTypeDefs = fs.readFileSync(path.join(__dirname, './Products/products.graphql'), 'utf-8');

// Merge the type definitions
const mergedTypeDefs = mergeTypeDefs([suppliersTypeDefs, manufacturersTypeDefs, distributorsTypeDefs, productsTypeDefs]);

// Import the resolvers
const suppliersResolvers = require('./Suppliers/suppliersResolvers');
const manufacturersResolvers = require('./Manufacturers/manufacturersResolvers');
const distributorsResolvers = require('./Distributors/distributorsResolvers');
const productsResolvers = require('./Products/productsResolvers');

// Merge the resolvers
const mergedResolvers = mergeResolvers([suppliersResolvers, manufacturersResolvers, distributorsResolvers, productsResolvers]);

// Create the Apollo Server instance
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    try {
      const user = jwt.verify(token, 'secret-key');
      return { user };
    } catch (error) {
      return {};
    }
  },
});

// Start the server
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
