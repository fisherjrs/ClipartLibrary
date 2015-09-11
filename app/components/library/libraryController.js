var libraryController = angular.module('libraryController', []);

libraryController.controller('LibraryController', function($scope, $http, $modal, $log) {
  $scope.person = {
      name: "Richard Hawley",
      occupation: "Star Gazer"
  };
  $scope.mode = 'offline';
  $scope.designId = 9;

  $scope.items = ['item1', 'item2', 'item3'];
  $scope.alertAnimationsEnabled = true;

  $scope.categoryEditMode = false;
  $scope.selectedItemId = -1;
  $scope.treeCollapsed = false;


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
            //$scope.person.occupation = response.data.categoryDefinition[0].categoryName;
            $scope.categoryDefinition = response.data.categoryList;
        }, function(response) {
            $scope.error = "Unable to retrieve category definition."
        });
  };

  // $scope.getImageList = function(designId, categoryId) {  	
  //   $http.get('http://localhost:9000/conduitservices/getimagelist?designId=' + designId + '&categoryId=' + categoryId ).
  // 		then(function(response) {
  // 			$scope.images = response.data;
  // 		}, function(response){
  //       $scope.error = "Unable to retriev image definition."
  //     });
  // };

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
        }]
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

    $scope.selectedItem = {

    };

    $scope.options = {
    };

    $scope.remove = function(scope) {
      scope.remove();
    };

    $scope.uiTreeToggle = function(scope) {
      scope.toggle();
    };

    var getRootNodesScope = function() {
      return angular.element(document.getElementById("tree2-root")).scope();
    };

    $scope.toggleAll = function(scope) {
      var rootNodeScope = getRootNodesScope();
      if($scope.treeCollapsed) {
        rootNodeScope.expandAll();
      } else {
        rootNodeScope.collapseAll();
      }
      $scope.treeCollapsed = !$scope.treeCollapsed;
    };

    $scope.newSubItem = function(scope) {
      var nodeData = scope.$modelValue;
      nodeData.categoryList.push({
        id: nodeData.id * 10 + nodeData.categoryList.length,
        categoryName: 'Rename Me',
        categoryList: []
      });
    };

    $scope.newSubItem_original = function(scope) {
      var nodeData = scope.$modelValue;
      nodeData.items.push({
        id: nodeData.id * 10 + nodeData.items.length,
        categoryName: 'Rename Me',
        items: []
      });
    };

     $scope.selectItem = function(scope) {
      var nodeData = scope.$modelValue;
      //only apply image source for subset of image array to avoid loading all images at once.
      images = nodeData.imageList;
      if(images != null) {
        for(j=0; j<images.length; j++){
          images[j].src2 = images[j].src;
         }
      }
       $scope.imageDefinition = images;     
    };

    $scope.editItem = function(scope) {
      var nodeData = scope.$modelValue;
      $scope.categoryEditMode = true;
      $scope.selectedItemId = nodeData.id;
    };

    $scope.updateItem = function(scope) {
      var nodeData = scope.$modelValue;
      $scope.categoryEditMode = false;
      $scope.selectedItemId = null;
    };

    $scope.deleteItem = function(scope) {
      var nodeData = scope.$modelValue;
      $scope.categoryEditMode = false;
      $scope.selectedItemId = null;
      scope.remove();
    };
  

  $scope.openModalAlert = function (scope, size) {

    var modalInstance = $modal.open({
      animation: $scope.alertAnimationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
      $scope.categoryEditMode = false;
      $scope.selectedItemId = null;
      scope.remove();
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
      $scope.categoryEditMode = false;
      $scope.selectedItemId = null;
    });
  };

  $scope.toggleAnimation = function () {
    $scope.alertAnimationsEnabled = !$scope.alertAnimationsEnabled;
  };

});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

libraryController.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
    
