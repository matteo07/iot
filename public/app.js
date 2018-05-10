angular.module('app', ['ngRoute'])
  .controller('AppController', function($scope, $route) {
    $scope.title = "Sensors Manager";
    $scope.greenLight = true;
    $scope.floorOpened = 1;
    //Callback from Socket messages
    var socket = io();
    socket.on('greenLight', function(msg){
      $scope.greenLight = msg;
      $route.reload();
    });
    socket.on('floorOpened', function(msg){
      $scope.floorOpened = msg;
      $route.reload();
    });
  })
  //SENSOR COMPONENT
  .component('sensor',{
    templateUrl: 'public/sensor.html',
    controller: function($scope, $http, $routeParams){
      $scope.title = "Sensor: ";
      $scope.sensorID = $routeParams.sensorID;
      $scope.checkboxModel = {
       value1 : true
      };
      $scope.post = function() {
        $http.post("sensor/" + $scope.sensorID + "/" + $scope.checkboxModel.value1);
      }
    }
  })
  //FRONT-END ROUTER
  .config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
			$routeProvider.
			when('/', {
				template: '<h2>Seleziona un sensore</h2>'
			}).when('/sensor/:sensorID', {
				template: '<sensor></sensor>'
			}).
			otherwise('/');
    }
  ]);
