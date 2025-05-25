const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  location: String,
  time: String,
  numberOfPeople: Number,
  dressCode: String,
});

module.exports = mongoose.model('Event', eventSchema);
