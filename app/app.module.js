var app = angular.module('clipartLibrary', []);
app.controller('DesignController', function($scope, $http) {
  $scope.person = {
    name: "Richard Hawley",
    occupation: "Star Gazer"
  };
  $scope.add = function(amount) { $scope.person.occupation = amount; };
  $scope.hello = function(amount) {
  	$http.get('http://localhost:9000/conduitservices/getdesigndefinition.json?designId=' + amount).
        success(function(data) {
            $scope.person.occupation = data.categoryDefinition[0].categoryName;
            $scope.categories = data.categoryDefinition;
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