const { mutationType, arg } = require('nexus');

const Mutation = mutationType({
  name: 'Mutation',
  definition(t) {
    // User Mutations
    t.field('registerUser', {
      type: 'Token',
      args: {
        userPayload: arg({
          type: 'UserRegisterInputType',
          required: true
        }) 
      }
    });
    t.field('loginUser', {
      type: 'Token',
      args: {
        userPayload: arg({
          type: 'UserLoginInputType',
          required: true
        }) 
      }
    });

    // Quotes Mutations
    t.field('createQuote', {
      type: 'Quote',
      args: {
        quotePayload: arg({
          type: 'QuoteInputType',
          required: true
        }) 
      }
    });

  }
});

module.exports = { Mutation };
