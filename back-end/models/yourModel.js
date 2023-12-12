const mongoose = require('mongoose');

const yourSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  salary: Number,
  position: String,
  startDate: Date,
  endDate: Date,
  months: Number,
});

const YourModel = mongoose.model('YourModel', yourSchema);

module.exports = YourModel;
