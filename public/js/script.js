'use strict';

angular.module('App', ['ngResource','ui.bootstrap', 'ui.router', 'ui.navbar'])

.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");

  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "home.html"
    })
    .state('cisternaDash', {
      url: "/cisternaDash",
      templateUrl: "partials/cisternaDash.html",
	  controller: 'cisternaDashCtrl'
    })
    .state('caixaDash', {
      url: "/caixaDash",
      templateUrl: "partials/caixaDash.html",
	  controller: 'caixaDashCtrl'
    })
    .state('temp', {
      url: "/temp",
      templateUrl: "partials/temp.html",
    controller: 'TempCtrl'
    })
	.state('relatorio', {
      url: "/relatorio",
      templateUrl: "partials/relMensal2.html",
	  controller: 'tableJsonCtrl3'
    });
})

.controller('NavigationController', function($scope) {

  $scope.allMenuItens = [
    
  {
    name: "Nivel Reservatório",
    link: "#",
    subtree: [{
      name: "Cisterna",
      link: "cisternaDash"
    }, {
      name: "Caixa d'Agua",
      link: "caixaDash"
    }]
  }, 

 {
    name: "Relatório",
    link: "#",
    subtree: [{
      name: "Relatório",
      link: "relatorio"
    }, {
      name: "Temp",
      link: "temp"
    }]
  },
  
  ]
});
