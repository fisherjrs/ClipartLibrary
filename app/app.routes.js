
var app = angular.module('clipartLibrary');

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/library', {
        templateUrl: 'app/components/library/libraryView.html',
        controller: 'LibraryController'
      }).
      when('/home', {
        templateUrl: 'app/components/home/homeView.html',
        controller: 'LibraryController'
      }).
      when('/publish', {
        templateUrl: 'app/components/publish/publishView.html',
        controller: 'DesignController'
      }).
      when('/compare', {
        templateUrl: 'app/components/compare/compareView.html',
        controller: 'DesignController'
      }).
      when('/admin', {
        templateUrl: 'app/components/admin/adminView.html',
        controller: 'DesignController'
      }).
      when('/reports', {
        templateUrl: 'app/components/reports/reportsView.html',
        controller: 'DesignController'
      }).
      when('/seed', {
        templateUrl: 'app/components/seed/seedView.html',
        controller: 'DesignController'
      }).
      when('/uitree', {
        templateUrl: 'app/components/uiTree/uiTreeView.html',
        controller: 'DesignController'
      }).
      otherwise({
        redirectTo: 'barf.html'
      });
  }]);