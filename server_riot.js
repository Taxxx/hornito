var express = require('express.io'),
	swig = require('swig'),
	morgan = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	dgram = require('dgram'),
 	arduino_server = dgram.createSocket("udp4");

//asignando sockects al servidor http
var app = express();
app.http().io();

//renderear vistas
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', './app/views');

// agregamos post, cookie y sesiones
app.use(morgan('dev'));
app.use(cookieParser());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//Configurando passport
//app.use(passport.initialize());
//app.use(passport.session());

// Carga Archivos Estaticos
app.use(express.static('./public'));

//Controllers
var homeController = require('./app/controllers/home');
var appController = require('./app/controllers/app');
homeController(app);
appController(app,arduino_server);

/*
request({
  method: 'POST',
  url: 'http://one.hackiot.com:8080/riot-core-services/api/user/login',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: "{  \"username\": \"team25\",  \"password\": \"chester\"}"
}, function (error, res, body) {
  console.log('Status:', res.statusCode);
  //console.log('Headers:', JSON.stringify(response.headers));
  //console.log('Response:', body);
  res.redirect('riot');
});
*/

//Socket_Arduino
arduino_server.on("listening", function() {
    var address = arduino_server.address();
    console.log("server listening " + address.address + ":" + address.port);
});

arduino_server.bind(6000); //listen to udp traffic on port 6000

//Server escuchando
app.listen(3000);
console.log('Escuchando en puerto: 3000');