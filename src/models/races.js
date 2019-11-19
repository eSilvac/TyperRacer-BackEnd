const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let raceSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  quoteId: { type: Schema.Types.ObjectId, ref: 'Quote' },
  language: {
    type: [String],
    enum: ['ESP', 'ENG'],
    required: [true, "is required"],
  },
  practice: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Race', raceSchema);
