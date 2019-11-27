const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let participantSchema = new mongoose.Schema({
  raceId: { type: Schema.Types.ObjectId, ref: 'Race' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  wpm: {
    type: Number,
    default: 0,
    required: [true, "is required"],
  },
  progress: {
    type: Number,
    default: 0,
    required: [true, "is required"],
  },
  status: {
    type: [String],
    enum: ['onProgress', 'ended'],
  },
}, { timestamps: true });

module.exports = mongoose.model("Participant", participantSchema);
