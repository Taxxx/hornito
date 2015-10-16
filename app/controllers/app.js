var querystring = require('querystring'),
	//Riot = require('../models/data_riot'),
	request = require('request');


var appController = function(app, arduino_server){
	console.log('appController esta cargado');


	app.get('/app', function(req, res){
		console.log('Hola app');
		/*
		app.io.broadcast('send_data', {
			riot: '25,1,0'
		});
		*/
		res.render("send_riot");
	});

	app.post('/app/send_riot', function(req, res){
		console.log('Hola /app/send_riot');
		app.io.broadcast('data_arduino', {
			val: req.body.val
		});
		//res.send('Envio Exitoso');
		res.redirect('/app');
	});



	arduino_server.on("message", function(msg, rinfo) { //every time new data arrives do this:)
		console.log('esta vivo');
	    //console.log("server got: " + msg.readUInt16LE(0) + " from " + rinfo.address + ":" + rinfo.port);
	    //io.emit('arduino data', msg.readUInt16LE(0));
	    var arduinoArray = msg.toString().split(',');
	    //console.log(msg.toString());
	    //console.log(parseInt(arduinoArray[0]));
	    var sensorID = 'sensordata' + arduinoArray[0];
	    console.log(sensorID, parseInt(arduinoArray[1]));
	    //app.io.broadcast(sensorID, parseInt(arduinoArray[1]));

	    //debugger;

	    //Request RIOT

	    request({
	    	method: 'POST',
		  url: 'http://one.hackiot.com:8080/riot-core-services/api/user/login',
		  headers: {
		    'Content-Type': 'application/json',
		    'Accept': 'application/json'
		  },
		  body: "{  \"username\": \"team25\",  \"password\": \"chester\"}"
		}, function (error, response, body) {
		  console.log('Status:', response.statusCode);
		  console.log('Headers:', JSON.stringify(response.headers));
		  //console.log('Response:', body);
		//   pepe({
		//   method: 'GET',
		//   url: 'http://one.hackiot.com:8080/riot-core-services/api/thingType/',
		//   headers: {
		//     'Content-Type': 'application/json',
		//     'Accept': 'application/json',
		//     'Api_key': 'db30fedf07761fa810d1d6ca606cfbdb43b52485e0a2756616b8733b828f5bb7'
		//   },
		//   body: "{}"
		// }, function (error, response, body) {
		//   console.log('Status:', response.statusCode);
		//   console.log('Headers:', JSON.stringify(response.headers));
		//   console.log('Response:', body);
		// });
		request({
		  method: 'POST',
		  url: 'http://one.hackiot.com:8080/riot-core-services/api/thing/3825/field/19064',
		  headers: {
		    'Content-Type': 'application/json',
		    'Accept': 'application/json',
		    'Api_key': 'db30fedf07761fa810d1d6ca606cfbdb43b52485e0a2756616b8733b828f5bb7'
		  },
		  body: "{  \"value\": \""+arduinoArray[0]+"\"}"
			}, function (error, response, body) {
			  //console.log('Status:', response.statusCode);
			  //console.log('Headers:', JSON.stringify(response.headers));
			  //console.log('Response:', body);
			});

			request({
		  method: 'POST',
		  url: 'http://one.hackiot.com:8080/riot-core-services/api/thing/3825/field/19065',
		  headers: {
		    'Content-Type': 'application/json',
		    'Accept': 'application/json',
		    'Api_key': 'db30fedf07761fa810d1d6ca606cfbdb43b52485e0a2756616b8733b828f5bb7'
		  },
		  body: "{  \"value\": \""+arduinoArray[1]+"\"}"
			}, function (error, response, body) {
			  //console.log('Status:', response.statusCode);
			  //console.log('Headers:', JSON.stringify(response.headers));
			  //console.log('Response:', body);
			});


			request({
		  method: 'POST',
		  url: 'http://one.hackiot.com:8080/riot-core-services/api/thing/3825/field/19063',
		  headers: {
		    'Content-Type': 'application/json',
		    'Accept': 'application/json',
		    'Api_key': 'db30fedf07761fa810d1d6ca606cfbdb43b52485e0a2756616b8733b828f5bb7'
		  },
		  body: "{  \"value\": \""+arduinoArray[2]+"\"}"
			}, function (error, response, body) {
			  //console.log('Status:', response.statusCode);
			  //console.log('Headers:', JSON.stringify(response.headers));
			  //console.log('Response:', body);
			});

		});

	
	    //Actualiza Datos
	    app.io.broadcast('data_arduino', {
			//val: req.body.val
			temperatura: arduinoArray[0],
			foco: arduinoArray[1],
			ventilador: arduinoArray[2]
		});
	});


};
module.exports = appController;