var mongoose = require('mongoose'); //mongo connection
var QrData = require('./models/qrschema');


module.exports = function(app) {

app.get('/api/data', function(req, res, next) {
        mongoose.model('Ws').find({}, function (err, ws) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
    })
	
app.post('/api/data', function (req, res, next) {
		var sD= new sensorData();
		sD.datetime = req.body.datetime;
		sD.condoid = req.body.condoid;
		sD.blocoid = req.body.blocoid;
		sD.sensorid = req.body.sensorid ;
		sD.poleid = req.body.poleid ;
		sD.level1 = req.body.level1 ;
		sD.level2 = req.body.level2;
		sD.level3 = req.body.level3;
		sD.level4 = req.body.level4;
		sD.temp = req.body.temp;
		sD.humi = req.body.humi;
 
		sD.save(function (err, post) {
			if (err) { return next(err) }
 		       res.status(201).json({ message: 'data added to reservoir collection'});
	})

})		


}