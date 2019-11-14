const {  makeSchema } = require('nexus');

const UserSchema = require('./user');

const schema = makeSchema({
  types: UserSchema
});

module.exports = schema;
