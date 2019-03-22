const mongoose = require('mongoose');
const CommandSchema = require('../schemas/command-schema');
const Command = mongoose.model('command', CommandSchema);

module.exports = Command;
