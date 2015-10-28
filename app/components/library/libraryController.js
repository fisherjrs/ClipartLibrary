var libraryController = angular.module('libraryController', []);

libraryController.controller('LibraryController', function($rootScope, $scope, $http, $modal, $log, $timeout, $document) {
 
  $rootScope.authenticated = false;
  $scope.mode = 'offline';
  $scope.designId = 9;

  $scope.items = ['itemzzz', 'item2', 'item3'];
  $scope.alertAnimationsEnabled = true;

  $scope.categoryEditMode = false;
  $scope.selectedItemId = -1;
  $scope.selectedCategory = null;
  $scope.treeCollapsed = false;

  $scope.viewTypeLiquidBox = true;

  $scope.imageDetailSelected = false;
  $scope.selectedImage = null;

  $scope.showAddImageDialogue = true;

  $scope.imageDragOn = false;
  $scope.imageDragInProcess = false;
  $scope.imageDragPromise;

  $scope.imageLibraryHover = false;

  $scope.clickPosition = {'x': 0, 'y':0};
  $scope.selectedItem = {};

  $scope.options = {};

  $scope.testImageDefinition =  {
                    "id": "677324678",
                    "name": "PA-3844",
                    "height": "4000",
                    "width": "3500",
                    "statuscode": "A",
                    "defaultrotation": "0",
                    "used": "false",
                    "missingnamesflag": "false",
                    "displayname": "PA-3844",
                    "imagedesignid": "9",
                    "cropmethod": "STRETCHBMP",
                    "imagetype": "CLIPART",
                    "syncind": "Y",
                    "filetype": "TIF",
                    "sourcecolorspace": "RGB",
                    "istransparent": "true",
                    "locator": "TRY1-9-128166993",
                    "id": "19638043",
                    "systemname": "PLANT",
                    "uploaddate": "20150404",
                    "indexflag": "true",
                    "exempt": "false",
                    "whitepoint": "1.0",
                    "blackpoint": "0.0",
                    "midpoint": "1.0",
                    "saturationboost": "0.15",
                    "size": "3500x4000",
                    "src" : "http://localhost:9000/conduitservices/getdesignimage?path=library\\9\\34901\\Lighthouse.jpg",
                    "srccdn" : "http://localhost:9000/conduitservices/getdesignimage?uri=Chrysanthemum.jpg&locator=TRY1-9-128166993&quality=thumbnail",
                    "model" : "copy"
                }

 $scope.libraryImageMouseOver = function(scope, $event) {
    $scope.imageOverPromise = $timeout(function() {
      $scope.imageLibraryHover = true;
    }, 250);
  }

  $scope.libraryImageMouseOut = function(scope) {
    $timeout.cancel($scope.imageOverPromise);
    $scope.imageLibraryHover = false;
  }

  $scope.libraryImageMouseDown = function(scope, $event) {
    $scope.imageDragPromise = $timeout(function() {
      $scope.imageDragOn = true;
      $scope.clickPosition.x = $event.pageX;
      $scope.clickPosition.y = $event.pageY;
    }, 1000);
  }

  $scope.libraryImageMouseUp = function(scope) {
    //$scope.imageDragOn = false;
    $timeout.cancel($scope.imageDragPromise);     
  }

  // $scope.$watch('clickPosition.x', function() {
  //         console.log('hey, position has changed!');
  //       });
  // $scope.$watch('imageDragOn', function() {
  //         console.log('drag on!');
  //       });



  $scope.$on('image:detailOpen', function(event, scope) {
    //$scope.imageDetailSelected = true;
    $scope.selectedImage = scope;
    $scope.openImageDetailModal($scope, 'lg', $scope.selectedImage, $scope.selectedCategory, $scope.categoryDefinition);    
  });

  $scope.$on('image:detailClose', function(event, scope) {
    $scope.imageDetailSelected = false;
    $scope.selectedImage = null;
  });

  $scope.$on('image:draggingStarted', function(event, scope) {
    $scope.imageDragInProcess = true;
    $scope.selectedImage = scope;
    $scope.$apply();
  });

  $scope.$on('image:draggingStopped', function(event, scope) {
    $scope.imageDragInProcess = false;
    $scope.selectedImage = null;
    $scope.imageDragOn = false;
    $scope.$apply();
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

  $scope.$on('config:layoutChange', function(event, layoutControls){
    alert("Go!");
    $scope.layoutControls = layoutControls;
  });

  $rootScope.$on('config:layoutChange', function(event, layoutControls){
    alert("Go Go!");
    $scope.layoutControls = layoutControls;
  });

  $scope.$on('config:debugChange', function(event, layoutControls){
    $scope.configControls = debugControls;
  });

  $scope.$on('config:configChange', function(event, layoutControls){
    $scope.configControls = configControls;
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
  };

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
  };

  $scope.openImageDetailModal = function(scope, size, imageDefinition, selectedCategory, categoryList) {
    var modalInstance = $modal.open({
      animation: $scope.alertAnimationsEnabled,
      templateUrl:'imageDetail.html',
      controller: 'imageDetailController',
      scope: scope,
      size: size,
      imageDefinition: imageDefinition,
      selectedCategory: selectedCategory,
      categoryList: categoryList,
      resolve: {
        imageDefinition : function() {
          return imageDefinition;
        },
        selectedCategory : function() {
          return selectedCategory;
        },
        categoryList : function() {
          return categoryList;
        }
      }
    });

    modalInstance.result.then(function(){}, function() {
      $log.info('Modal dismissed at : ' + new Date());
    });
  }

  $scope.openCategoryDetail = function(scope, size, categoryList) {
    var modalInstance = $modal.open({
      animation: $scope.alertAnimationsEnabled,
      templateUrl:'categoryDetail.html',
      controller: 'categoryDetailController',
      scope: scope,
      size: size,
      categoryList: categoryList,
      resolve: {
        categoryList : function() {
          return categoryList;
        }
      }
    });

    modalInstance.result.then(function(){}, function() {
      $log.info('Modal dismissed at : ' + new Date());
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

libraryController.controller('imageDetailController', function($scope, $modalInstance, $log, imageDefinition, selectedCategory, categoryList){
  $scope.imageDetailUpdateSuccess = false;
  $scope.imageDefinition = imageDefinition;
  $scope.selectedCategory = selectedCategory;
  $scope.categoryList = categoryList;
  $scope.modalCategories = []; 
  $scope.disableNextButton = false;
  $scope.disablePreviousButton = false;

  angular.forEach($scope.selectedCategory.imageList, function(image, key){
    if(image.id === $scope.imageDefinition.id) {
      $scope.disableNextButton = (key >= $scope.selectedCategory.imageList.length - 1) ? true : false;
      $scope.disablePreviousButton = (key == 0) ? true : false;
    }
  });

  angular.forEach(categoryList, function(categoryItem) {
    flattenCategoryList($scope.modalCategories, categoryItem)   
  });

  $scope.ok = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.nextImage = function() {
    var newImageDefinition;
    
    //Remove update message in case it exists.
    imageDetailUpdateSuccess = false;

    //Loop over images to find next image definition. Enable/disable next/previous buttons.
    angular.forEach($scope.selectedCategory.imageList, function(image, key){
      if(image.id === $scope.imageDefinition.id) {
        if(key < $scope.selectedCategory.imageList.length) {
           newImageDefinition = $scope.selectedCategory.imageList[key + 1];
        } 
        $scope.disableNextButton = (key + 1 >= $scope.selectedCategory.imageList.length - 1) ? true : false;
        $scope.disablePreviousButton = (key + 1 == 0) ? true : false;
      }
    });

    //Change model.
    if(newImageDefinition != undefined) {
      $scope.imageDefinition = newImageDefinition;
    }
  }


  $scope.previousImage = function() {
    var newImageDefinition;

    //Remove update message in case it exists.
    imageDetailUpdateSuccess = false;
    
    //Loop over images to find next image definition. Enable/disable next/previous buttons.
    angular.forEach($scope.selectedCategory.imageList, function(image, key){
      if(image.id === $scope.imageDefinition.id) {
        if(key > 0) {
          newImageDefinition = $scope.selectedCategory.imageList[key - 1];
        }
        $scope.disableNextButton = (key - 1 >= $scope.selectedCategory.imageList.length - 1) ? true : false;
        $scope.disablePreviousButton = (key - 1 == 0) ? true : false;
      }
    });

    //Change model.
    if(newImageDefinition != undefined) {
      $scope.imageDefinition = newImageDefinition;
    }
  }

  $scope.update = function (imageDefinition, newCategorySelection) {
    console.log("Updated imageDefinition :: " + imageDefinition.id);
    $scope.imageDetailUpdateSuccess = true;

    if(newCategorySelection != $scope.selectedCategory.id) {
      
      //Remove image from selected category. Array structure changes.
      angular.forEach($scope.selectedCategory.imageList, function(image, key) {
        if(image.id === imageDefinition.id) {
          $scope.selectedCategory.imageList.splice(key, 1);         
          key--;
          $scope.imageDefinition = $scope.selectedCategory.imageList[key];
          $scope.disableNextButton = (key>= $scope.selectedCategory.imageList.length - 1) ? true : false;
          $scope.disablePreviousButton = (key == 0) ? true : false;
        }

      });

      //Add image to new category.
      angular.forEach($scope.categoryList, function(category, key) {
        if(category.id === newCategorySelection.id) {
          if(category.imageList == undefined) {
            category.imageList = [imageDefinition];
          } else {
            category.imageList.push(imageDefinition);
          }          
        }
      });
    };
  };


  function flattenCategoryList(flattenedList, categoryItem) {
    
    flattenedList.push(categoryItem);

    if(categoryItem.categoryList && categoryItem.categoryList.length) {
      angular.forEach(categoryItem.categoryList, function(categorySubItem) {
        categorySubItem.parent = categoryItem.categoryName;
        flattenCategoryList(flattenedList, categorySubItem);   
      });
    }
  };
});

libraryController.controller('categoryDetailController', function($scope, $modalInstance, $log, categoryList){
  $scope.categoryDefinition = categoryDefinition;
  $scope.categoryList = categoryList;
});

    
