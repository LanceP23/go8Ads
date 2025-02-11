const { mongoose } = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  airline: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, enum: ['On-time', 'Delayed', 'Cancelled'], default: 'On-time' },
  gateNumber: { type: String },
  terminal: { type: String },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Flight', flightSchema);
