angular.module('IotApp', ['ngRoute'])

  .controller('IotController', function($scope) {
    $scope.title = "Sensors Manager";
  })

  .component('sensor',{
    templateUrl: 'public/sensor.html',
    controller: function($scope){
      $scope.title = "Sensore:";
    },
    bindings: {
      id: '='
    }
  })

  .config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
			$routeProvider.
			when('/', {
				template: '<h3>select component</h3>'
			}).when('/s1', {
				template: '<sensor id="1"></sensor>'
			}).when('/s2', {
				template: '<sensor id="2"></sensor>'
			}).when('/s3', {
				template: '<sensor id="3"></sensor>'
			}).when('/s4', {
				template: '<sensor id="4"></sensor>'
			}).when('/s5', {
				template: '<sensor id="5"></sensor>'
			}).
			otherwise('/');
    }
  ])
;
