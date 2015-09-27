var libraryController = angular.module('libraryController', []);

libraryController.controller('LibraryController', function($scope, $http, $modal, $log) {
 
  $scope.mode = 'offline';
  $scope.designId = 9;

  $scope.items = ['itemzzz', 'item2', 'item3'];
  $scope.alertAnimationsEnabled = true;

  $scope.categoryEditMode = false;
  $scope.selectedItemId = -1;
  $scope.selectedCategory = null;
  $scope.treeCollapsed = false;

  $scope.imageDetailSelected = false;
  $scope.selectedImage = null;

  $scope.showAddImageDialogue = true;

  $scope.$on('image:detailOpen', function(event, scope) {
    $scope.imageDetailSelected = true;
    $scope.selectedImage = scope;
  });

  $scope.$on('image:detailClose', function(event, scope) {
    $scope.imageDetailSelected = false;
    $scope.selectedImage = null;
  });

  $scope.$on('image:addImage', function(event, categoryId, imageDefinition) {
    angular.forEach($scope.categoryDefinition, function(category){
      if(category.id == categoryId) {
        if(category.imageList == undefined) {
          category.imageList = [imageDefinition];
        } else {
          category.imageList.push(imageDefinition);
        }
      } 
    });
  });
  
  $scope.getCategories = function(designId) {
    url = 'http://localhost:9000/conduitservices/getdesigndefinition.json?designId=';
    if ($scope.mode == 'offline') {
        url = 'http://localhost:9000/conduitservices/getdesigndefinitionoffline.json?designId='
    }
    $http.get( url + designId).
        then(function(response) {
            //$scope.person.occupation = response.data.categoryDefinition[0].categoryName;
            $scope.designDefinition = response.data;
            $scope.categoryDefinition = response.data.categoryList;
        }, function(response) {
            $scope.error = "Unable to retrieve category definition."
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

  $scope.addImageToCategory = function(categoryId, imageDefinition) {
    angular.forEach($scope.categoryDefinition, function(category){
      if(category.id == categoryId) {
        if(category.imageList == undefined) {
          category.imageList = [imageDefinition];
        } else {
          category.imageList.push(imageDefinition);  
        }
        
      } 
    });
  }

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

    $scope.isSelectedCategory = function(categoryId) {
      
      if($scope.selectedCategory == undefined) {
        return false;
      }

      if( categoryId === $scope.selectedCategory.id) {
        return true;
      }
      
      return false;
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
      $scope.selectedCategory = nodeData;
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

  $scope.openAddImageDialogue = function(scope, size, category) {
     var modalInstance = $modal.open({
      animation: $scope.alertAnimationsEnabled,
      templateUrl: 'imageAddDialogue.html',
      controller: 'AddImageController',
      scope: scope,
      size: size,
      category: category,
      resolve: {
        items: function () {
          return $scope.items;
        },
        category : function () {
          return $scope.selectedCategory;
        },
        categories : function () {
          return $scope.categoryDefinition;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
      $scope.categoryEditMode = false;
      $scope.selectedItemId = null;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
      $scope.categoryEditMode = false;
      $scope.selectedItemId = null;
    });
  }

$scope.openDesignDefinitionDump = function(scope, size, designDefinition) {
     var modalInstance = $modal.open({
      animation: $scope.alertAnimationsEnabled,
      templateUrl: 'designDefinitionDump.html',
      controller: 'designDefinitionDumpController',
      scope: scope,
      size: size,
      designDefinition: designDefinition,
      resolve: {
        designDefinition : function () {
          return designDefinition;
        }
      }
    });

    modalInstance.result.then(function () {}, function () {
      $log.info('Modal dismissed at: ' + new Date());
      $scope.categoryEditMode = false;
      $scope.selectedItemId = null;
    });
  }

  //Functions to run as page loads ... kinda like init();
  $scope.getCategories($scope.designId); 

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

libraryController.controller('AddImageController', function ($scope, $modalInstance, Upload, $timeout, items, category, categories) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };
  $scope.category = category;

  $scope.modalCategories = [];

  $scope.selectedFiles = [];
  
  angular.forEach(categories, function(categoryItem) {
    flattenCategoryList($scope.modalCategories, categoryItem)   
  });

  $scope.designId = 9; 

  $scope.uploadFiles = function(files) {
        $scope.files = files;
        angular.forEach(files, function(file) {
          if (file && !file.$error) {
              
              file.upload = Upload.upload({
                url: 'http://localhost:9000/conduitservices/intermediateupload.json',
                fields: {designId: $scope.designId, categoryId: $scope.category.id, imageName: file.name },
                file: file
              });

              file.upload.then(function (response) {
                $timeout(function () {
                  file.result = response.data;                  

                  //Notify the listeners that we've add a new image.      ... hardcoded for now until we find a real image url
                  $scope.$emit('image:addImage', $scope.category.id, {
                    "id" : -1,
                    "displayName" : file.displayName, 
                    "src" : file.result.url,
                    "srccdn" : "" });
                  });
              
              }, function (response) {
                if (response.status > 0)
                  $scope.errorMsg = response.status + ': ' + response.data;
              });

              file.upload.progress(function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
              });
          }   
        });
    }

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.removeFileItem = function(files, scope) {
      files.splice(scope, 1); 
  }

  function flattenCategoryList(flattenedList, categoryItem) {
    flattenedList.push(categoryItem);
    if(categoryItem.categoryList && categoryItem.categoryList.length) {
      angular.forEach(categoryItem.categoryList, function(categorySubItem) {
        flattenCategoryList(flattenedList, categorySubItem)   
      });
    }
  };

});


libraryController.controller('designDefinitionDumpController', function ($scope, $modalInstance, $http, designDefinition) {

  $scope.designDefinition = designDefinition;
  $scope.response;

  $scope.publish = function (designDefinition) {
    $http.post('http://localhost:9000/conduitservices/publishdesigndefinition.json?fred=34', designDefinition).
        then(function(response) {
          $scope.response = response.data;
        }, function(response) {
            $scope.error = "Unable to save."
        });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});



    
