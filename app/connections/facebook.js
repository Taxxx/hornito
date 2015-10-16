var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/user');

var facebookConnection = function(app){
	//console.log('facebookConnection ready yep :D');
	//console.log(FacebookStrategy);
	passport.use(new FacebookStrategy(
	{
		clientID: '1556600987922486',
		clientSecret: '131e73a8fa1a64550444fba1f43d515e',
		callbackURL: 'http://192.168.0.102:3000/auth/facebook/callback'
	}, 
	function(token, tokenSecret, profile, done){
		//debugger;

		var user = new User({
			username: profile.username,
			facebook: profile
		});

		user.save(function(err){
			//debugger;
			if(err){
				done(err,null);
				return;
			}
			done(null, profile);
		});
		
	}
	));

	app.get('/auth/facebook',passport.authenticate('facebook'));

	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook', {failureRedirect: '/?error=algo-fallo'}), 
		function(req, res){
			//debugger;
			res.redirect('/app');
		}
	);
};

module.exports = facebookConnection;