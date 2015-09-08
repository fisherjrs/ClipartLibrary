

var clipartLibraryControllers = angular.module('clipartLibraryControllers', []);

clipartLibraryControllers.controller('DesignController', function($scope, $http) {
  $scope.person = {
      name: "Richard Hawley",
      occupation: "Star Gazer"
  };
  $scope.mode = 'offline';
  $scope.designId = 9;
  $scope.add = function(amount) { $scope.person.occupation = amount; };
  $scope.hello = function(amount) {
  	$http.get('http://localhost:9000/conduitservices/getdesigndefinition.json?designId=' + amount).
        then(function(data) {
            $scope.person.occupation = data.categoryDefinition[0].categoryName;
            $scope.categoryDefinition = data.categoryDefinition;
        }, function(data) {
            $scope.error = "Unable to retrieve design definition."
        });
  };
  
  $scope.getCategories = function(designId) {
    url = 'http://localhost:9000/conduitservices/getdesigndefinition.json?designId=';
    if ($scope.mode == 'offline') {
        url = 'http://localhost:9000/conduitservices/getdesigndefinitionoffline.json?designId='
    }
    $http.get( url + designId).
        then(function(response) {
            $scope.person.occupation = response.data.categoryDefinition[0].categoryName;
            $scope.categoryDefinition = response.data.categoryDefinition;
        }, function(response) {
            $scope.error = "Unable to retrieve category definition."
        });
  };

  $scope.getImageList = function(designId, categoryId) {  	
    $http.get('http://localhost:9000/conduitservices/getimagelist?designId=' + designId + '&categoryId=' + categoryId ).
  		then(function(response) {
  			$scope.images = response.data;
  		}, function(response){
        $scope.error = "Unable to retriev image definition."
      });
  };

  $scope.displayImages = function(categoryId) {
      $scope.imageDefinition = null;
      $scope.categoryId = categoryId;
      for(i=0; i<$scope.categoryDefinition.length; i++) {
        if($scope.categoryDefinition[i].categoryId == categoryId) {
            //only apply image source for subset of image array to avoid loading all images at once.
            images = $scope.categoryDefinition[i].imageDefinition;
            for(j=0; j<2; j++){
              images[j].src2 = images[j].src;
            }
            $scope.imageDefinition = images;
          break;
        }
      }
  };

  $scope.list = [{
      "id": 1,
      "title": "1. dragon-breath",
      "items": []
    }, {
      "id": 2,
      "title": "2. moiré-vision",
      "items": [{
        "id": 21,
        "title": "2.1. tofu-animation",
        "items": [{
          "id": 211,
          "title": "2.1.1. spooky-giraffe",
          "items": []
        }, {
          "id": 212,
          "title": "2.1.2. bubble-burst",
          "items": []
        }],
      }, {
        "id": 22,
        "title": "2.2. barehand-atomsplitting",
        "items": []
      }],
    }, {
      "id": 3,
      "title": "3. unicorn-zapper",
      "items": []
    }, {
      "id": 4,
      "title": "4. romantic-transclusion",
      "items": []
    }];

    $scope.selectedItem = {};

    $scope.options = {
    };

    $scope.remove = function(scope) {
      scope.remove();
    };

    $scope.uiTreeToggle = function(scope) {
      scope.toggle();
    };

    $scope.newSubItem = function(scope) {
      var nodeData = scope.$modelValue;
      nodeData.items.push({
        id: nodeData.id * 10 + nodeData.items.length,
        title: nodeData.title + '.' + (nodeData.items.length + 1),
        items: []
      });
    };
});

