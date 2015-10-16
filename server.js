var express = require('express.io'),
	swig = require('swig'),
	multer  = require('multer'),
	morgan = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	_ = require('underscore'),
	passport = require('passport');
//Manejo de sesiones con Redist
var RedisStore = require('connect-redis')(session);
//asignando sockects al servidor http
var app = express();
app.http().io();
//arreglo de usuarios
var users = [];

var sess = {
  store: new RedisStore({}),
  //store: new RedisStore({
  	//host: conf.redis.host,
  	//port: conf.redis.port,
  	//user: conf.redis.user,
  	//pass: conf.redis.pass
  //}),
  secret: 'dipdulidu',
  cookie: {}
}

//renderear vistas
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', './app/views');

// Carga Archivos Estaticos
app.use(express.static('./public'));

// agregamos post, cookie y sesiones
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret: 'holo'}));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//Configurando passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(obj, done){
	done(null, obj);
});
//Controllers
var homeController = require('./app/controllers/home');
var appController = require('./app/controllers/app');
homeController(app,users);
appController(app,users);

//Connections Twitter
var twitterConnection = require('./app/connections/twitter');
twitterConnection(app);

//Connections Facebook
var facebookConnection = require('./app/connections/facebook');
facebookConnection(app);

//Server escuchando
app.listen(3000);
console.log('Escuchando en puerto: 3000');