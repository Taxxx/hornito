var passport = require('passport'),
	TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../models/user');

var twitterConnection = function(app){
	//console.log('twitterConnection ready yep :D');
	//console.log(TwitterStrategy);
	passport.use(new TwitterStrategy(
	{
		consumerKey: 'PvCMCzgmMIiUxHsJyFDFy7sXg',
		consumerSecret: 'vP0sQ93yY2mYksxlRkL3w2lPnH2ANKKfV2CllgVP5BCrdWiMKO',
		callbackURL: 'http://192.168.0.102:3000/auth/twitter/callback'
	}, 
	function(token, tokenSecret, profile, done){
		//debugger;

		var user = new User({
			username: profile.username,
			twitter: profile
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

	app.get('/auth/twitter',passport.authenticate('twitter'));

	app.get('/auth/twitter/callback', 
		passport.authenticate('twitter', {failureRedirect: '/?error=algo-fallo'}), 
		function(req, res){
			//debugger;
			res.redirect('/app');
		}
	);
};

module.exports = twitterConnection;