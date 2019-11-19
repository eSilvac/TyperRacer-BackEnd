const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let participantSchema = new mongoose.Schema({
  raceId: { type: Schema.Types.ObjectId, ref: 'Race' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  wpm: {
    type: Number,
    required: [true, "is required"],
  }
}, { timestamps: true });

module.exports = mongoose.model("Participant", participantSchema);
