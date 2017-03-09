var mongoose = require('mongoose')
//mongoose.connect( 'mongodb://lfilipe.email:mlab123@ds139949.mlab.com:39949/mlabsensordb', function () {
  mongoose.connect('mongodb://localhost/sensordb', function () {  
  //console.log('mongodb connected to mLab: ds139949.mlab.com:39949/mlabsensordb')
  //mongoose.connect( 'mongodb://leandro2m:mlab123@ds119750.mlab.com:19750/undercontrol', function () {
  //console.log('Mongodb connected mlab')
})
module.exports = mongoose
