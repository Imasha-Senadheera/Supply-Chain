# Project Setup Documentation

## Running the Server:
1. Clone the project repository from GitHub (if applicable).
2. Navigate to the project directory in your terminal.
3. Install dependencies using npm or yarn: `npm install` or `yarn install`.
4. Start the GraphQL server: `npm start` or `yarn start`.
5. The server should now be running locally at [http://localhost:4000](http://localhost:4000).

## Accessing the GraphQL Playground:
1. Open a web browser.
2. Navigate to [http://localhost:4000](http://localhost:4000).
3. The GraphQL Playground interface should open, allowing you to interact with the API.

## Interacting with the API:
1. Write GraphQL queries and mutations in the left panel of the Playground.
2. Execute queries and mutations by clicking the play button (▶️) or by pressing `Ctrl + Enter` (or `Cmd + Enter` on macOS).
3. View the results in the right panel of the Playground.

## GraphQL Schema Documentation:

### Types and Fields:

1. **Supplier:**
   - `supplierID`: Unique identifier for the supplier (ID scalar type).
   - `name`: Name of the supplier (String scalar type).
   - `material`: Material supplied by the supplier (String scalar type).
   - `location`: Location of the supplier (String scalar type).

2. **Manufacturer:**
   - `manufacturerID`: Unique identifier for the manufacturer (ID scalar type).
   - `name`: Name of the manufacturer (String scalar type).
   - `product`: Product manufactured by the manufacturer (String scalar type).
   - `location`: Location of the manufacturer (String scalar type).
   - `supplies`: List of suppliers associated with the manufacturer (List of Supplier type).

3. **Distributor:**
   - `distributorID`: Unique identifier for the distributor (ID scalar type).
   - `name`: Name of the distributor (String scalar type).
   - `region`: Region served by the distributor (String scalar type).

4. **Product:**
   - `productID`: Unique identifier for the product (ID scalar type).
   - `name`: Name of the product (String scalar type).
   - `category`: Category of the product (String scalar type).
   - `manufacturingCost`: Cost of manufacturing the product (Float scalar type).
   - `manufacturer`: Manufacturer of the product (Manufacturer type).
   - `distributor`: Distributor of the product (Distributor type).

### Custom Directives or Scalar Types:
No custom directives or scalar types mentioned in the provided schema.

## Setting Up the Neo4j Database (if necessary):
1. Install Neo4j database locally or set up a hosted Neo4j instance.
2. Create a new database and note down the connection details (e.g., URI, username, password).
3. Ensure that your GraphQL server is configured to connect to the Neo4j database.
4. Run any necessary database migrations or scripts to set up the initial data.

## Other Dependencies:
1. **GraphQL Server:** Ensure you have a GraphQL server setup, such as Apollo Server or Express GraphQL.
2. **Node.js:** Ensure you have Node.js installed on your system to run the server.
3. **npm or yarn:** Use npm or yarn to manage dependencies and run scripts.

By following this structure, you provide clear instructions on how to set up and interact with your GraphQL API, as well as an understanding of the data model and dependencies required for the project.
