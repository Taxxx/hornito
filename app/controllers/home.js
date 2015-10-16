var _ = require('underscore'),
	request = require('request');
var homeController = function(app){
	console.log('homeController esta ready');

	var swLogueo = function(req, res, next){
		if(req.body.username != 'team25' && req.body.password != 'chester'){
			res.redirect('/');
			return;
		}
		next();
	};

	app.get('/',function(req, res){
		//debugger;
		console.log('En casa');
		res.render('logueo');
	});

	app.post('/log-in', swLogueo, function(req, res){
		console.log('hola log-in');
		res.render('home');
		/*
		request({
		  method: 'POST',
		  url: 'http://one.hackiot.com:8080/riot-core-services/api/user/login',
		  headers: {
		    'Content-Type': 'application/json',
		    'Accept': 'application/json'
		  },
		  body: "{  \"username\": \"req.body.username\",  \"password\": \"req.body.password\"}"
		}, function (error, response, body) {
		  console.log('Status:', response.statusCode);
		  console.log('Headers:', JSON.stringify(response.headers));
		  console.log('Response:', body);
		});
		*/

	});

	app.get('/log-out', function(req, res){
		console.log('hola log-out');
	});
};
module.exports = homeController;