//config/passport
var config = require('./config')();
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var findOrCreate = require('mongoose-findorcreate');
var mongoose = require('mongoose');

module.exports = function(){
	var githubCallback = 'http://' + config.domain + ':'
		+ config.port + '/auth/github/callback';

	var Usuario = mongoose.model('Usuario');

	passport.use(new GitHubStrategy({

		clientID: config.clientID,
		clientSecret: config.clientSecret,
		callbackURL: githubCallback
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