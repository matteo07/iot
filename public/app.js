angular.module('app', ['ngRoute'])
  //FRONT-END ROUTER
  .config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $routeProvider
        .when('/', {
        template: '<h2>Select action</h2>'
      }).when('/enter', {
        template: '<enter></enter>'
      }).when('/exit/:floor', {
        template: '<exit></exit>'
      }).when('/output', {
        template: '<output></output>'
      }).otherwise('/');
    }
  ])
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
    controller: function($scope, $http, $routeParams){
      $scope.inputNumber = 1;
      $scope.floor = $routeParams.floor;
      $scope.exit = function() {
        $http.post("exit/" + $scope.floor + "/" + $scope.inputNumber);
      }
    }
  })
  //OUTPUT COMPONENT
  .component('output',{
    templateUrl: 'public/output.html',
    controller: function($scope, $route) {
      $scope.title = "Sensors Manager";
      $scope.greenLight = true;
      $scope.floorOpened = 0;
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
    }
  });
