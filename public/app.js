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
  //ENTER COMPONENT
  .component('enter',{
    templateUrl: 'public/enter.html',
    controller: function($scope, $http){
      $scope.inputNumber = 1;
      $scope.entry = function() {
        $http.post("entry/" + $scope.inputNumber);
      }
    }
  })
  //EXIT COMPONENT
  .component('exit',{
    templateUrl: 'public/exit.html',
    controller: function($scope, $http){
      $scope.inputNumber = 1;
      $scope.exit = function() {
        $http.post("exit/" + $scope.inputNumber);
      }
    }
  })
  //FRONT-END ROUTER
  .config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
			$routeProvider.
			when('/', {
				template: '<h2>Seleziona un sensore</h2>'
			}).when('/enter', {
				template: '<enter></enter>'
			}).when('/exit', {
				template: '<exit></exit>'
			}).when('/output', {
				templateUrl: 'output.html'
			}).
			otherwise('/');
    }
  ]);
