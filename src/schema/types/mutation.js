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
      nullable: true,
      args: {
        quotePayload: arg({
          type: 'QuoteInputType',
          required: true
        }) 
      }
    });

    // Races Mutations
    t.field('createRace', {
      type: 'RacePayloadType',
      args: {
        racePayload: arg({
          type: 'RaceInputType',
          required: true
        }) 
      }
    });
  }
});

module.exports = { Mutation };
