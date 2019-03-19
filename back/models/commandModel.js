const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommandSchema = new Schema({
  applianceName: {
    type: String,
    required: [true, 'Name is required']
  },
  order: {
    type: String,
    required: [true, 'Order is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [false]
  },
  occurence: {
    type: String,
    required: [true, 'Occurence is required']
  },
});

const Command = mongoose.model('command', CommandSchema);

module.exports = Command;