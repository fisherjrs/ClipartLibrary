var appController = angular.module('appController', []);

appController.controller('AppController', function($rootScope, $scope, $http, $modal, $log, $timeout, $document) {
 
  $rootScope.authenticated = true;

});