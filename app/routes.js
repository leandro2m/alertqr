var mongoose = require('mongoose'); //mongo connection
var sensorData = require('./models/sensorschema');
var TempData = require ('./models/tempschema'); // Schema para Temperatura

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
//Get para Schema de Temperatura do Espaco Comum
app.get('/api/data1', function(req, res, next) { 
        mongoose.model('Tp').find({}, function (err, tp) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(tp);
                    }
                });
              }     
        });
    })
//Post para temperatura do espaco comum
app.post('/api/data1', function (req, res, next) {
		var sD= new TempData();
		sD.datetime = req.body.datetime;
		sD.condoid = req.body.condoid;
		sD.blocoid = req.body.blocoid;
		sD.sensorid = req.body.sensorid ;
		sD.spaceid = req.body.spaceid ;
		sD.tempext = req.body.tempext ;
		sD.humiext = req.body.humiext;
		sD.tempspace = req.body.tempspace;
		sD.humispace = req.body.humispace;
		sD.presencecnt = req.body.presencecnt;
 
		sD.save(function (err, post) {
			if (err) { return next(err) }
 		       res.status(201).json({ message: 'data added to Tempeture collection'});
	})

})	


}