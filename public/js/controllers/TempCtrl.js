angular.module('App').controller("TempCtrl", function($scope, $http) {
	$scope.app = "App";
	$scope.items = [];

	var carregaDados = function() {
		$http.get("http://localhost:8080/api/data1").then(function(response) {
			$scope.items = response.data
			
		});
	}
  carregaDados();
})
