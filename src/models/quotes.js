const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    maxlength: 400,
    minlength: 150,
    required: [true, "is required"],
  },
  language: {
    type: [String],
    enum: ['ES', 'EN'],
    required: [true, "is required"],
  },
  races: [{ type: Schema.ObjectId, ref: 'Race'}],
});

module.exports = mongoose.model("Quote", quoteSchema);
