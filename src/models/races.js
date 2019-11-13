const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let raceSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  text: {
    type: String,
    required: [true, "is required"],
  },
  language: {
    type: [String],
    enum: ['ES', 'EN'],
    required: [true, "is required"],
  },
  practice: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });
