const { queryType, stringArg } = require('nexus');

const Query = queryType({
  definition(t) {
    // Users Queries
    t.field('currentUser', {
      type: 'User',
      nullable: true,
      args: {
        token: stringArg({
          required: true
        })
      },
    });
    
    // QuotesQueries
    t.list.field('getQuotes', {
      type: 'Quote',
      nullable: true,
    });
  }
});

module.exports = { Query };
