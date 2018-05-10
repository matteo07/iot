angular.module('app', ['ngRoute'])

  .controller('AppController', function($scope, $route) {
    $scope.title = "Sensors Manager";
    $scope.greenLight = "";
    var socket = io();
    socket.on('greenLight', function(msg){
      console.log(msg)
      $scope.greenLight = msg;
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

      $scope.init = function () {
        /*$http.get("sensor/" + $routeParams.sensorID,{})
          .then(function(response){
            console.log("sensor/" + $routeParams.sensorID + ": " +  response.data);
            $scope.checkboxModel.value1 = response.data;
            console.log($scope.checkboxModel.value1);
          });*/
      }

      $scope.post = function() {
        console.log("posting  " + "sensor/" + $scope.sensorID + "/" + $scope.checkboxModel.value1);
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
  ])

  .factory('socket', ['$rootScope', function($rootScope) {
  var socket = io.connect();

  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    }
  };
}]);
