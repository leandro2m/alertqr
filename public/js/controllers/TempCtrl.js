angular.module('App').controller("TempCtrl", function($scope, $http) {
	$scope.app = "App";
	$scope.items = [];

	var carregaDados = function() {
		$http.get("https://leandro2m.herokuapp.com/api/data1").then(function(response) {
			$scope.items = response.data
			
		});
	}
  carregaDados();
})
