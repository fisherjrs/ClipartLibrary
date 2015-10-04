
var app = angular.module('clipartLibrary', [
  'ngRoute',
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

// app.config([
//     "$routeProvider",
//     "$httpProvider",
//     function($routeProvider, $httpProvider){
//         $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
//     }
// ]);




