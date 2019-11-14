const { objectType, queryType, mutationType, stringArg, arg, inputObjectType } = require('nexus');

const User = objectType({
  name: 'User',
  definition(t) {
    t.string('username');
    t.string('email');
    t.field('token', { type: Token });
  },
});

const Token = objectType({
  name: "Token",
  definition(t) {
    t.string("Token", { required: true });
  },
});

const UserRegisterInputType = inputObjectType({
  name: 'UserRegistInputType',
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

const Query = queryType({
  definition(t) {
    t.field('currentUser', {
      type: User,
      nullable: true,
      args: {
        token: stringArg({
          required: true
        })
      },
    });
  }
});

const Mutation = mutationType({
  name: 'Mutation',
  definition(t) {
    t.field('registerUser', {
      type: User,
      args: {
        userPayload: arg({
          type: UserRegisterInputType,
          required: true
        }) 
      }
    });

    t.field('loginUser', {
      type: User,
      args: {
        userPayload: arg({
          type: UserLoginInputType,
          required: true
        }) 
      }
    });
  }
});

  module.exports = { Query, Mutation }
