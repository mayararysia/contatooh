//public /js/main.js

angular.module('contatooh', ['ngRoute', 'ngResource'])
	.config(function($routeProvider, $httpProvider){

		$httpProvider.interceptors.push('meuInterceptor');
		/*$httpProvider.interceptors.push(function($q, $location) {  
	    	var meuInterceptor = {
		    	responseError: function(resposta) {
		            if (resposta.status == 401) {
		    		  $location.path('/auth');
		    		}
		            return $q.reject(resposta);
		    	}
    		}

    		return meuInterceptor;
		});*/

		$routeProvider.when('/contatos', {
			templateUrl: 'partials/contatos.html',
			controller: 'ContatosController'
		});

		$routeProvider.when('/contato/:contatoId', {
			templateUrl: 'partials/contato.html',
			controller: 'ContatosController'
		});

		$routeProvider.when('/contato', {
			templateUrl: 'partials/contato.html',
			controller: 'ContatoController'
		});

		$routeProvider.when('/auth', {
			templateUrl: 'partials/auth.html'
		});

		
		$routeProvider.otherwise({ redirectTo: '/contatos' });

});
