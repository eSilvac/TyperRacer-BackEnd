const {  makeSchema } = require('nexus');

const UserSchema = require('./types/user');
const RaceSchema = require('./types/race');
const QuoteSchema = require('./types/quote');
const Query = require('./types/query');
const Mutation = require('./types/mutation');

const schema = makeSchema({
  types: [Query, Mutation, UserSchema, QuoteSchema, RaceSchema]
});

module.exports = schema;
