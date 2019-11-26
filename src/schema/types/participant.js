const { objectType, inputObjectType, enumType } = require('nexus');

const Participant = objectType({
  name: 'Participant',
  definition(t) {
    t.id('id', { required: true })
    t.int('wpm')
    t.int('progress')
    t.field('status', { type: ParticipantStatus })
  },
});

const ParticipantStatus = enumType({
  name: 'ParticipantStatus',
  members: [
    { name: 'onProgress' },
    { name: 'ended' }
  ]
});


const ParticipantInputType = inputObjectType({
  name: 'ParticipantInputType',
  definition(t) {
    t.id('userId');
    t.id('raceId', { required: true });
    t.int('wpm');
    t.int('percentage');
    t.field('status', { 
      type: ParticipantStatus,
      required: true 
    });
  }
});

module.exports = { Participant, ParticipantInputType }
