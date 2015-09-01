var app = angular.module('clipartLibrary', []);
app.controller('DesignController', function($scope, $http) {
  $scope.person = {
    name: "Richard Hawley",
    occupation: "Star Gazer"
  };
  $scope.add = function(amount) { $scope.person.occupation = amount; };
  $scope.hello = function(amount) {
  	$http.get('http://mspwwdhfhlxr1.jostens.com:9000/conduitservices/getmessages.json').
        success(function(data) {
            $scope.person.occupation = data[0].author.lastname;
        });
  };
});

/*
 app.controller(function Hello($scope, $http) {
    $http.get('http://rest-service.guides.spring.io/greeting').
        success(function(data) {
            $scope.greeting = data;
        });
}
*/