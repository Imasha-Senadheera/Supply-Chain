const { ApolloError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { RateLimiterMemory } = require('rate-limiter-flexible');
const neo4j = require('neo4j-driver');

const rateLimiter = new RateLimiterMemory({
  points: 100,
  duration: 60,
});

let latestId = 0; // Assuming you want to track the latest ID for new Product

const productsResolvers = {
  Query: {
    products: async (_, __, { driver }) => {
      try {
        const session = driver.session();
        const result = await session.run('MATCH (p:Product) RETURN p');
        
        // Transforming Neo4j records into the desired response format
        const products = result.records.map(record => {
          const { productID, name, category, manufacturingCost } = record.get('p').properties;
          return {
            productID,
            name,
            category,
            manufacturingCost: parseFloat(manufacturingCost),
          };
        });
        
        session.close();

        return products;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw new ApolloError('Failed to fetch products', 'PRODUCTS_FETCH_ERROR');
      }
    }
  },
  Mutation: {
    createProduct: async (_, { productInput }, { driver }) => {
      const session = driver.session();
      try {
        const { name, category, manufacturingCost } = productInput;
        const result = await session.run(
          'CREATE (p:Product {name: $name, category: $category, manufacturingCost: $manufacturingCost}) RETURN p',
          { name, category, manufacturingCost }
        );
        const createdProduct = result.records[0].get('p').properties;
        session.close();
        return createdProduct;
      } catch (error) {
        console.error('Error creating product:', error);
        throw new ApolloError('Failed to create product', 'CREATE_PRODUCT_ERROR');
      }
    },
    updateProduct: async (_, { productID, name, category, manufacturingCost }, { driver }) => {
      const session = driver.session();
      try {
        const result = await session.run(
          'MATCH (p:Product {productID: $productID}) SET p.name = $name, p.category = $category, p.manufacturingCost = $manufacturingCost RETURN p',
          { productID, name, category, manufacturingCost }
        );
        const updatedProduct = result.records[0].get('p').properties;
        session.close();
        return updatedProduct;
      } catch (error) {
        console.error('Error updating product:', error);
        throw new ApolloError('Failed to update product', 'UPDATE_PRODUCT_ERROR');
      }
    },
    deleteProduct: async (_, { productID }, { driver }) => {
      const session = driver.session();
      try {
        await session.run('MATCH (p:Product {productID: $productID}) DELETE p', { productID });
        session.close();
        return true;
      } catch (error) {
        console.error('Error deleting product:', error);
        throw new ApolloError('Failed to delete product', 'DELETE_PRODUCT_ERROR');
      }
    },
  }
};

module.exports = productsResolvers;