
var angularImage = angular.module('ui.image', [])
    .constant('imageConfig', {
      dragThreshold: 3,
      levelThreshold: 30
    });

    angularImage.controller('ImageController', function ($scope) {
        $scope.img1 = { 
          src : "http://www.dwuser.com/education/content/creating-responsive-tiled-layout-with-pure-css/images/demo/3.jpg" ,
          name : "jardin",
          id : "3456781"
        };

        $scope.imageLibraryHover = false;// $scope.$parent.imageLibraryHover;

        $scope.detailHandler = function(scope) {
          //alert("Go! ImageController.");
          //scope.$parent.imageHandler(scope.info);
          $scope.$emit('image:detailOpen', scope.info);
        };

        $scope.clickHandler = function(scope) {
          alert("Go!");
        }

        $scope.onElementMouseEnter = function(){
          $scope.imageLibraryHover = true;
        }

        $scope.onElementMouseLeave = function(){
          console.log("Recording mouseout...");
          $scope.imageLibraryHover = false;
          $scope.$apply();
        }

        $scope.onControlMouseOver = function(event){
          event.stopPropagation();
        }

        $scope.onControlMouseOut = function(event){
          event.stopPropagation();
        }

        $scope.$parent.$watch('imageDragOn', function() {
           console.log('hey, start dragging.');
        });

        $scope.$parent.$watch('imageLibraryHover', function() {
          // $scope.imageLibraryHover = $scope.$parent.imageLibraryHover;
        });

        $scope.$watch('position.x', function() {
           //console.log('hey, watch position.x.' + $scope.position.x);
           // $element.css({
           //      top: $scope.position.y + 'px',
           //      left: $scope.position.x +'px'
           //    });
           //Don't start triggering this until after initial load.
           // if($scope.enableDraggable) {
           //    $element.trigger("mousedown"); 
           // }
           //$scope.enableDraggable = true;
        });
      });
    

    angularImage.directive('libraryImage', ['$document', function ($document) {
        return {
          restrict: 'E',
          scope: {
            info: '=info',
            position: '=position'
          },
          controller : 'ImageController',
          templateUrl: 'http://localhost/workspaces/javascript/loft/ClipartLibrary/app/shared/libraryImage.html',
          link: function(scope, element, attr) {
            var startX = 0, startY = 0, x = 0, y = 0;

            element.css({
             cursor: 'pointer'
            });

            element.on('mouseenter', function(event) {
              // Prevent default dragging of selected content
              event.preventDefault();
              scope.onElementMouseEnter();         
            });

            element.on('mouseleave', function(event) {
              // Prevent default dragging of selected content
              event.preventDefault();
              scope.onElementMouseLeave();         
            });

            element.on('mousedown', function(event) {
              element.css({
               opacity: 0.75
              });

              //Prevent default dragging of selected content
              event.preventDefault();
              startX = event.pageX - x;
              startY = event.pageY - y;
              
              $document.on('mousemove', mousemove);
              $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
              y = event.pageY - startY;
              x = event.pageX - startX;
              element.css({
                top: y + 'px',
                left:  x + 'px',
                'z-index': 999
              });
            }

            function mouseup() {
              element.css({
               opacity: 1
              });
              $document.off('mousemove', mousemove);
              $document.off('mouseup', mouseup);
            }
          }
        };
      }]);

