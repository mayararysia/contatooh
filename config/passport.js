//config/passport
var config = require('./config')();
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var findOrCreate = require('mongoose-findorcreate');
var mongoose = require('mongoose');

module.exports = function(){

	var Usuario = mongoose.model('Usuario');

	passport.use(new GitHubStrategy({
		/*clientID: 'e04873bc8e2bb1535ad3',
		clientSecret: 'd40398b1d8a68fbed87b00e5002d4e7d711c8677',*/
		clientID: config.clientID,
		clientSecret: config.clientSecret,
		callbackURL: 'http://localhost:3000/auth/github/callback'
	}, function(accessToken, refreshToken, profile, done){

		Usuario.findOrCreate(
			{ "login": profile.username},
			{ "nome": profile.username},
			function(erro, usuario) {
				if(erro){
					console.log(erro);
					return done(erro);
				}
				return done(null, usuario);
			}
		);
	}));

	/*
		Chamado apenas UMA vez e recebe o usuario do nosso banco disponibilizado
		pelo callback da estrategia de autenticacao . Realizara a serializacao apenas
		do ObjectId do usuario na sessao.
	*/
	passport.serializeUser(function(usuario, done){
		done(null, usuario._id);
	});

	//Recebe o ObjectId do Usuario armazenado na sessao
	//Chamado a cada requisiçao
	passport.deserializeUser(function(id, done){
		Usuario.findById(id).exec()
		.then(function(usuario){
			done(null, usuario);
		});
	});
};