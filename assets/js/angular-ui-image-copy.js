
var angularImage = angular.module('ui.image.copy', [])
    .constant('imageConfig', {
      dragThreshold: 3,
      levelThreshold: 30
    });

    angularImage.controller('ImageControllerCopy', function ($scope, $element) {
        $scope.img1 = { 
          src : "http://www.dwuser.com/education/content/creating-responsive-tiled-layout-with-pure-css/images/demo/3.jpg" ,
          name : "jardin",
          id : "3456781"
        };

        $scope.broadcastStartDrag = true;

        // $scope.detailHandler = function(scope) {
        //   //alert("Go! ImageController.");
        //   //scope.$parent.imageHandler(scope.info);
        //   scope.$emit('image:detailOpen', scope.info);
        // };

        // $scope.clickHandler = function(scope) {
        //   alert("Go!");
        // }
        $scope.startDrag = function(scope) {
          if($scope.broadcastStartDrag){
            scope.$emit('image:draggingStarted', scope.info);
            $scope.broadcastStartDrag = false;
          }
        }

        $scope.stopDrag = function(scope) {
          scope.$emit('image:draggingStopped', scope.info);
        }

        $scope.$parent.$watch('imageDragOn', function() {
           console.log('hey, add show image copy.');
        });

        $scope.$watch('position.x', function() {
           console.log('hey, watch position.x.' + $scope.position.x);
           $element.css({
                position: 'absolute',
                cursor: 'pointer',
                top: $scope.position.y + 'px',
                left: $scope.position.x - 150 +'px',
               'z-index': 999
              });
        });
      });
    

    angularImage.directive('libraryImageCopy', ['$document', function ($document) {
        return {
          restrict: 'E',
          scope: {
            info: '=info',
            position: '=position'
          },
          controller : 'ImageControllerCopy',
          transclude: true,
          templateUrl: 'http://localhost/workspaces/javascript/loft/ClipartLibrary/app/shared/libraryImage.html',
          link: function(scope, element, attr) {
            var startX = 0, startY = 0, x = 0, y = 0;
            
            element.css({
              position: 'absolute',
              cursor: 'pointer',
              top: scope.$parent.clickPosition.y + 'px',
              left: scope.$parent.clickPosition.x - 150 + 'px',
             'z-index': 999
            });

            element.on('mouseover', function(event) {
              // Prevent default dragging of selected content
              event.preventDefault();
              console.log("mouse over pagex, y :::" + event.pageX + ", " + event.pageY);
              console.log("check position :::" + scope.position.x);
            });

            element.on('mousedown', function(event) {

              console.log("mouse down event pagex, y :::" + event.pageX + ", " + event.pageY);
              
              element.css({
               opacity: 0.4
              });

              //Prevent default dragging of selected content
              event.preventDefault();
              startX = event.pageX - x;
              startY = event.pageY - y;
              
              console.log(startX + " " + startY)
              $document.on('mousemove', mousemove);
              $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
              console.log("mouse move event pagex, y :::" + event.pageX + ", " + event.pageY);

              y = event.pageY - startY;
              x = event.pageX - startX;
              element.css({
                top: y + 'px',
                left:  x + 'px',
                'z-index': 999
              });

              scope.startDrag(scope);              
            }

            function mouseup() {
              element.css({
               opacity: 1
              });
              $document.off('mousemove', mousemove);
              $document.off('mouseup', mouseup);
              scope.stopDrag(scope);
            }
          }
        };
      }]);

