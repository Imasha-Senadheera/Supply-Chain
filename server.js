const { ApolloServer } = require('apollo-server');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const fs = require('fs');
const path = require('path');

const loadFiles = (dir) =>
  fs.readdirSync(dir)
    .filter(file => file.endsWith('.graphql'))
    .map(file => fs.readFileSync(path.join(dir, file), 'utf-8'));

// Load type definitions
const suppliersTypeDefs = loadFiles(path.join(__dirname, './Suppliers'));
const manufacturersTypeDefs = loadFiles(path.join(__dirname, './Manufacturers'));
const distributorsTypeDefs = loadFiles(path.join(__dirname, './Distributors'));
const productsTypeDefs = loadFiles(path.join(__dirname, './Products'));

// Merge type definitions
const mergedTypeDefs = mergeTypeDefs([...suppliersTypeDefs, ...manufacturersTypeDefs, ...distributorsTypeDefs, ...productsTypeDefs]);

// Load resolvers
const suppliersResolvers = require('./Suppliers/suppliersResolvers');
const manufacturersResolvers = require('./Manufacturers/manufacturersResolvers');
const distributorsResolvers = require('./Distributors/distributorsResolvers');
const productsResolvers = require('./Products/productsResolvers');

// Merge resolvers
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
