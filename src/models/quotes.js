const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let quoteSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  text: {
    type: String,
    maxlength: [200, 'Too long'],
    minlength: [50, 'Too short'],
    required: [true, "is required"],
  },
  language: {
    type: [String],
    enum: ['ENG', 'ESP'],
    required: [true, "is required"],
  },
  races: [{ type: Schema.ObjectId, ref: 'Race'}],
});

module.exports = mongoose.model("Quote", quoteSchema);
