angular.module('app', ['ngRoute'])
  //FRONT-END ROUTER
  .config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $routeProvider
        .when('/', {
        template: '<h2>Select action</h2>'
      }).when('/enter', {
        template: '<enter></enter>'
      }).when('/booked', {
        template: '<booked></booked>'
      }).when('/exit/:floor', {
        template: '<exit></exit>'
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
  //ENTER BOOKED
  .component('booked',{
    templateUrl: 'public/booked.html',
    controller: function($scope, $http){
      $scope.cf = "";
      $scope.entry = function() {
        $http.post("booked/" + $scope.cf);
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
