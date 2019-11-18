const { objectType, queryType, mutationType, stringArg, arg, inputObjectType } = require('nexus');

const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id');
    t.string('username');
    t.string('email');
    t.string('admin');
    t.string('token', { required: true });
  },
});

const Token = objectType({
  name: "Token",
  definition(t) {
    t.string("token", { required: true });
  },
});

const UserRegisterInputType = inputObjectType({
  name: 'UserRegisterInputType',
  definition(t) {
    t.string('username', { required: true })
    t.string('email', { required: true })
    t.string('password', { required: true })
  }
});

const UserLoginInputType = inputObjectType({
  name: 'UserLoginInputType',
  definition(t) {
    t.string('username', { required: true })
    t.string('password', { required: true })
  }
});

module.exports = { User, Token, UserRegisterInputType, UserLoginInputType }
