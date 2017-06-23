// Load required packages
var mongoose = require('mongoose');

// Define our sensor schema
var qrSchema   = new mongoose.Schema({
 datetime: String,
 url: String,
 id: String
},
{collection : 'Qr'}
);

// Export the Mongoose model
module.exports = mongoose.model('Ws', qrSchema);