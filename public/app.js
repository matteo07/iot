angular.module('app', ['ngRoute'])

  .controller('AppController', function($scope) {
    $scope.title = "Sensors Manager";
  })

  .component('sensor',{
    templateUrl: 'public/sensor.html',
    controller: function($scope, $routeParams){
      this.title = "Sensore: ";
      this.params = $routeParams;
    }
  })
  //FRONT-END ROUTER
  .config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
			$routeProvider.
			when('/', {
				template: '<h3>select component</h3>'
			}).when('/sensor/:sensorID', {
				template: '<sensor></sensor>'
			}).
			otherwise('/');
    }
  ]);
