const { mongoose } = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  adId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ad', required: true },
  displayStart: { type: Date, required: true },
  displayEnd: { type: Date, required: true },
  intervalSeconds: { type: Number, required: true }, 
});

module.exports = mongoose.model('AdSchedule', scheduleSchema);
