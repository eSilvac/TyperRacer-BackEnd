const { objectType, inputObjectType, enumType } = require('nexus');

const Race = objectType({
  name: 'Race',
  definition(t) {
    t.id('id', { required: true })
    t.field('status', { type: RaceStatus })
    t.field('language', { type: RaceLanguage })
  },
});

const RaceLanguage = enumType({
  name: 'RaceLanguage',
  members: [
    { name: 'ENG' },
    { name: 'ESP' }
  ]
});

const RaceStatus = enumType({
  name: 'RaceStatus',
  members: [
    { name: 'waiting' },
    { name: 'started' },
    { name: 'ended' },
  ]
});

const RacePayloadType = objectType({
  name: 'RacePayloadType',
  definition(t) {
    t.field('race', { type: Race })
    t.field('quote', { type: 'Quote' })
  },
});

const RaceInputType = inputObjectType({
  name: 'RaceInputType',
  definition(t) {
    t.id('userId');
    t.field('language', { 
      type: RaceLanguage,
      required: true 
    });
  }
});

module.exports = { RacePayloadType, RaceInputType }
