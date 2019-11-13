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

// Routes
//const Route = require('./routes/route');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));

// Graphql
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

app.use('/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
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
