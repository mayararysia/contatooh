// app/server.js
var http = require('http');
var app = require('./config/express')(app);
console.log('Server.js');
require('./config/database.js')('mongodb://localhost/contatooh');

console.log('Server.js');

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express Server escutando na porta ' + app.get('port'));
});
