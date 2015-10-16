var dgram = require("dgram");

var server = dgram.createSocket("udp4");
var fs = require('fs');



var crlf = new Buffer(2);
  crlf[0] = 0xD; //CR - Carriage return character
  crlf[1] = 0xA; //LF - Line feed character

function getDateTime() {

var date = new Date();

var hour = date.getHours();
hour = (hour < 10 ? "0" : "") + hour;

var min  = date.getMinutes();
min = (min < 10 ? "0" : "") + min;

var sec  = date.getSeconds();
sec = (sec < 10 ? "0" : "") + sec;

var year = date.getFullYear();

var month = date.getMonth() + 1;
month = (month < 10 ? "0" : "") + month;

var day  = date.getDate();
day = (day < 10 ? "0" : "") + day;

return year + "/" + month + "/" + day + " " + hour + ":" + min + ", ";

}

server.on("error", function (err) {
  console.log("server error:\n" + err.stack);
  server.close();
});

server.on("message", function (msg, rinfo) {
 console.log(getDateTime() + msg + " from " +
 rinfo.address + ":" + rinfo.port);
 fs.appendFile("mydata.txt",getDateTime() + msg + crlf, encoding='utf8',function(err){});//write the value to file and add CRLF for line break

});

server.on("listening", function () {
  var address = server.address();

  console.log("server listening " +
  address.address + ":" + address.port);
 });

server.bind(6000);