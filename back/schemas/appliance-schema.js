const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplianceSchema = new Schema({
  name: String,
  type: String,
});

module.exports = ApplianceSchema;
