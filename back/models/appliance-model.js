const mongoose = require('mongoose');
const ApplianceSchema = require('../schemas/appliance-schema');
const Appliance = mongoose.model('appliance', ApplianceSchema);

module.exports = Appliance;
