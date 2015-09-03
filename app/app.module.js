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
  $scope.getImageList = function(designId, categoryId) {
  	$http.get('http://localhost:9000/conduitservices/getimagelist?designId=' + designId + '&categoryId=' + categoryId ).
  		success(function(data) {
  			$scope.images = data;
  		});
  };
});

