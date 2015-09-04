// config/express.js 

var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');

module.exports = function(){
	var app = express();

	
	console.log('config express');
	
	 // variavel de ambiente
	 // configuracao de ambiente
	 app.set('port', 3000);

	 // middleware
	 app.use(express.static('./public'));
	 // abaixo do middleware express.static
	 app.set('view engine', 'ejs');
	 app.set('views', './app/views');
	 app.use(express.static('./public'));
	 //novos middlewares
	 app.use(bodyParser.urlencoded({extended: true}));
	 app.use(bodyParser.json());
	 app.use(require('method-override')());

	 app.use(cookieParser());
	 app.use(session(
		{
			secret: 'homem avestruz',
			resave: true,
			saveUninitialized: true

		}
	  ));

	 app.use(passport.initialize());
	 app.use(passport.session());

	 app.use(helmet.xframe());//evita referenciamento por <frame> ou <iframe
	 app.use(helmet.xssFilter());
	 app.use(helmet.nosniff());
	 app.disable('x-powered-by');

	 //carregamento de rotas
	load('models', {cwd: 'app'})
	 	.then('controllers')
	 	.then('routes/auth.js')
	 	.then('routes')
	 	.into(app);

	 app.get('*', function(req, res){
	 	res.status(404).render('404');
	 });

	 return app;
};