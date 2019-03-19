const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgramSchema = new Schema({
  programs: {
    type: Array,
    required: [true]
  }
});

const Program = mongoose.model('program', ProgramSchema);

module.exports = Program;