
var app = angular.module('clipartLibrary', [
  'ngRoute',
  'ui.router',
  'appController',
  'libraryController',
  'adminController',
  'ui.tree',
  'ngAnimate', 
  'ui.bootstrap',
  'ui.image',
  'ui.image.copy',
  'ui.imageDetail',
  'ngFileUpload']);

app.constant("EVENTS", {
        "CLICK": "click",
        "DESTROY": "$destroy"
    });

app.constant("RESOURCES", {
        "RUNTIME_CONFIG_URL": "assets/config/runtimeconfig.json",
    });

app.config([
  "$routeProvider",
  "$httpProvider",
  "$stateProvider",
  "$urlRouterProvider",
    function($routeProvider, $httpProvider, $stateProvider, $urlRouterProvider){
      
      //$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*'; //This will generate an error: Request header field Access-Control-Allow-Headers is not allowed by Access-Control-Allow-Headers.

      // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise("/state1");
      //
      // Now set up the states
      $stateProvider
        .state('state1', {
          url: "/state1",
          templateUrl: "partials/state1.html"
        })
        .state('state1.list', {
          url: "/list",
          templateUrl: "partials/state1.list.html",
          controller: function($scope) {
            $scope.items = ["A", "List", "Of", "Items"];
          }
        })
        .state('state2', {
          url: "/state2",
          templateUrl: "partials/state2.html"
        })
        .state('state2.list', {
          url: "/list",
          templateUrl: "partials/state2.list.html",
          controller: function($scope) {
            $scope.things = ["A", "Set", "Of", "Things"];
          }
        });
    }
]);




