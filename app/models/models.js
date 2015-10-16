var mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.1.7:3000/'+'db_riot');

module.exports = mongoose;