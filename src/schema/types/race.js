const { objectType, inputObjectType, enumType } = require('nexus');

const Race = objectType({
  name: 'Race',
  definition(t) {
    t.id('id', { required: true })
    t.field('language', { type: RaceLanguage })
    t.string('createdAt', { required: true })
  },
});

const RaceLanguage = enumType({
  name: 'RaceLanguage',
  members: [
    { name: 'ENG' },
    { name: 'ESP' }
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
