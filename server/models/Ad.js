const { mongoose } = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mediaType: { type: String, enum: ['Image', 'Video'], required: true },
  mediaUrl: { type: String, required: true },
  duration: { type: Number, required: true }, 
  priority: { type: Number, default: 0 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  active: { type: Boolean, default: true },
  resolution:{type: String, enum:['Res1','Res2', 'Res3'], default: 'Res1'},
  orient:{type:String, default:true},
});

module.exports = mongoose.model('Ad', adSchema);
