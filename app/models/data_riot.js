var models = require('./models'),
	Schema = models.Schema;

var RiotSchema = Schema({
	temperatura: 'string',
	foco: 'string',
	ventilador: 'string'
});

var Riot = models.model('data_riot', RiotSchema);

module.exports = Riot;