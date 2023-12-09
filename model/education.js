const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
  degreeName: { type: String, required: true },
  collegeName: { type: String, required: true },
  percentage: { type: Number, required: true },
  passingYear: { type: Number, required: true },
});

const educationSchema = new mongoose.Schema({
  education: [detailSchema],
});

const Education = mongoose.model('Education', educationSchema);

exports.Education=Education;
