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

    // RaceQueries
    t.field('getRace', {
      type: 'RacePayloadType',
      nullable: true,
      args: {
        id: stringArg({
          required: true
        })
      },
    });
    
    //ParticipantQueries
    t.list.field('getParticipants', {
      type: 'Participant',
      args: {
        raceId: stringArg({
          required: true
        })
      },
    });
  }
});

module.exports = { Query };
