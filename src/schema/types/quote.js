const { objectType, enumType, queryType, mutationType, stringArg, arg, inputObjectType } = require('nexus');

const Quote = objectType({
  name: 'Quote',
  definition(t) {
    t.string('text');
    t.field('language', { type: QuoteLanguage })
  },
});

const QuoteLanguage = enumType({
  name: 'QuoteLanguage',
  members: [
    { name: 'ENG' },
    { name: 'ESP' }
  ]
});

const QuoteInputType = inputObjectType({
  name: 'QuoteInputType',
  definition(t) {
    t.string('text', { required: true })
    t.field('language', { 
      type: QuoteLanguage,
      required: true 
    })
  }
});

module.exports = { Quote, QuoteInputType }
