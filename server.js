var http = require('http');
var app  = require('./config/express')();
var config = require('./config/config')();
require('./config/database')(config.db);
require('./config/passport')();
require('./config/database.js')('mongodb://localhost/contatooh');

http.createServer(app).listen(config.port, config.address, 
	function(){
  		console.log('Express Https Server '
  		  + config.address
  		  + ' (' + config.env
  		  + ') escutando na porta ' + config.port);
});