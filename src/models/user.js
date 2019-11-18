const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    maxlength: 150,
    minlength: 5,
    required: [true, "is required"],
    unique: true
  },

  username: {
    type: String,
    maxlength: 50,
    minlength: 2,
    required: [true, "is required"],
    unique: true
  },

  password: {
    type: String,
    required: [true, "is required"]
  },

  admin: {
    type: Boolean,
    default: false
  },

  races: [{ type: Schema.ObjectId, ref: 'Race'}],

  participants: [{ type: Schema.ObjectId, ref: 'Participant'}]
});

module.exports = mongoose.model("User", userSchema);
