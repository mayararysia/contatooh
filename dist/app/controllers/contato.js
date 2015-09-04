//app/controllers/contato.js

var sanitize = require('mongo-sanitize');
module.exports = function(app){

	var Contato = app.models.contato;
	var controller = {};

	controller.listaContatos = function(req, res){
		Contato.find().populate('emergencia').exec()
		.then(
		  function(contatos){
		  	res.json(contatos);
		  },
		  function(erro){
			  	console.error(erro);
			  	//erro interno do servidor (status500)
			  	res.status(500).json(erro);
		  }
		 );
	};

	controller.obtemContato = function(req, res){
		var _id = req.params.id;
		Contato.findById(_id).exec()
		.then(
			function(contato){
				if(!contato) throw new Error("Contato nao encontrado");
				res.json(contato);
			},
			function(erro){
				console.log(erro);
				res.status(404).json(erro);
			}
		 );
	};

	controller.removeContato = function(req, res) {
		var _id = sanitize(req.params.id);
		Contato.remove({"_id" : _id}).exec()
		.then(
			function(){
				//204 nenhum conteudo: O servidor processou a solicitação com sucesso, mas não está retornando nenhum conteúdo.
				res.status(204).end();
				res.end();
			},
			function(erro){
				return console.error(erro);
			}
		);
	};

	controller.salvaContato = function(req, res){
		var _id = req.body._id;
		/*
			Independente da quantidade de par^ametros, 
			apenas selecionamos o nome, email e emergencia:
		*/
		var dados = {
			"nome" : req.body.nome,
			"email" : req.body.email,
			"emergencia" : req.body.emergencia || null
		};
		
		if(_id) {
			Contato.findByIdAndUpdate(_id, dados).exec()
			.then(
				function(contato){
					res.json(contato);
				},
				function(erro){
					console.error(erro);
					res.status(500).json(erro);
				}
			);
		}else{
			Contato.create(dados)
			.then(
				function(contato){
					//201 Criado: O pedido foi cumprido e resultou em um novo recurso que está sendo criado.
					res.status(201).json(contato);
				},
				function(erro){
					console.log(erro);
					res.status(500).json(erro);
				}
			);
		}
	};

	return controller;
};