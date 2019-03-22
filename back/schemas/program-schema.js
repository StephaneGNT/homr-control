const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommandSchema = require('./command-schema');

const ProgramSchema = new Schema({
  name: String,
  commands: [CommandSchema],
});

module.exports = ProgramSchema;
