// public/js/controller/ContatosController.js 

angular.module('contatooh').controller('ContatosController',
	function(Contato, $scope){
	$scope.mensagem = {texto: ''};
	$scope.contatos = [];
	$scope.filtro = '';

	function buscaContatos(){
		Contato.query(
			function(contatos) {
				$scope.contatos = contatos;
				$scope.mensagem = {};
			},
			function(erro) {
				console.log(erro);
				$scope.mensagem = {
					texto: 'Nao foi possivel obter a lista'
				};
			}
		);
	}
	buscaContatos();

	$scope.remove = function(contato){
		Contato.delete({id: contato._id},
			buscaContatos,
			function(erro) {				
				$scope.mensagem = {
					texto: 'Nao foi possivel remover o contato'
				};
				console.log(erro);
			}
		);
	};
});