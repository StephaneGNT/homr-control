const mongoose = require('mongoose');
const ProgramSchema = require('../schemas/program-schema')
const Program = mongoose.model('program', ProgramSchema);

module.exports = Program;
