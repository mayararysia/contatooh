//public/js/controllers/ContatoController.js

angular.module('contatooh').controller('ContatoController', 
	function($scope, Contato, $routeParams){
		
		if($routeParams.contatoId){
			Contato.get({id: $routeParams.contatoId},
				function(contato) {
					$scope.contato = contato;
				},
				function(erro) {
					$scope.mensagem = {
						texto: 'Contato nao existe. Novo contato.'
					};
				}
			);
		}else{
			$scope.contato = new Contato();
		}

		$scope.salva = function(){
			$scope.contato.$save()
				.then(function(){
					$scope.mensagem = {texto: 'Salvo com sucesso'};
					$scope.contato = new Contato();

					$scope.$broadcast('contatoSalvo');
				})
				.catch(function(erro){
					$scope.mensagem = {texto: 'Nao foi possivel salvar'};
				});
		};

		Contato.query(function(contatos){
			$scope.contatos = contatos;
		});
		
	
});