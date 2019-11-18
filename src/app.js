// Initial Config
const cors = require('cors');
const path = require('path');
const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

// Database
require("./db");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));

// Graphql
const schema = require('./schema/config');
const resolvers = require('./schema/resolvers/index');
const handleError = require('./schema/errors/errors');

app.use('/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
    customFormatErrorFn(err) {
      const body = err.originalError.body || null;
      return handleError(err.message, body);
    }
  }),
);

// Handle Errors 404
app.use((req, res, next) => {
  res.status(404).send('No route find');
});

// Handle Errors 500
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    res.status(422).json({ errors: err.errors });  
  } else {
    console.log(err);
    res.status(500).json({ error: err.message  });
  }
});

module.exports = app;
