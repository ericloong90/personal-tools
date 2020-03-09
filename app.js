const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema');
const resolvers = require('./resolvers');

const app = express();

app.get('/', (req, res) => {
  res.send(
    JSON.stringify({
      message: 'Navigate to /graphql endpoint for GraphQL queries',
    })
  );
});

app.use(
  '/graphql',
  graphqlHTTP(() => {
    return {
      schema,
      rootValue: {
        ...resolvers,
      },
      graphiql: {},
    };
  })
);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});
