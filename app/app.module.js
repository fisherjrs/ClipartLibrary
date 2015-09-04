var app = angular.module('clipartLibrary', []);
app.controller('DesignController', function($scope, $http) {
  $scope.person = {
    name: "Richard Hawley",
    occupation: "Star Gazer"
  };
  $scope.mode = 'offline';
  $scope.designId = 9;
  $scope.add = function(amount) { $scope.person.occupation = amount; };
  $scope.hello = function(amount) {
  	$http.get('http://localhost:9000/conduitservices/getdesigndefinition.json?designId=' + amount).
        success(function(data) {
            $scope.person.occupation = data.categoryDefinition[0].categoryName;
            $scope.categories = data.categoryDefinition;
        });
  };
  $scope.getCategories = function(designId) {
    url = 'http://localhost:9000/conduitservices/getdesigndefinition.json?designId=';
    if ($scope.mode == 'offline') {
        url = 'http://localhost:9000/conduitservices/getdesigndefinitionoffline.json?designId='
    }
    $http.get( url + designId).
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

