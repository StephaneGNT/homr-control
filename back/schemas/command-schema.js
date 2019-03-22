const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ApplianceSchema = require('./appliance-schema');

const CommandSchema = new Schema({
  appliance: ApplianceSchema,
  order: String,
  startDate: Date,
  endDate: Date,
  occurence: String
});

module.exports = CommandSchema;
