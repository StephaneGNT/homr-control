const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplianceSchema = new Schema({

  name: {
    type: String,
    required: [true, 'Type is required']
  },
  type: {
    type: String,
    required: [true, 'brand is required']
  },
});

const Appliance = mongoose.model('appliance', ApplianceSchema);

module.exports = Appliance;