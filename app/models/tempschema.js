// Load required packages
var mongoose = require('mongoose');

// Define our sensor schema
var  TempSchema  = new mongoose.Schema({
 datetime: String,
 condid: Number,
 blocoid: Number,
 sensorid: String,
 spaceid: Number,
 tempext: Number,
 humiext: Number,
 tempspace: Number,
 humispace: Number,
 presencecnt: Number,
},
{collection : 'tempeture'}
);

// Export the Mongoose model
module.exports = mongoose.model('Tp', TempSchema);