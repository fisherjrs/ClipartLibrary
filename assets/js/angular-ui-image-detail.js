
var angularImageDetail = angular.module('ui.imageDetail', [])
    .constant('imageConfig', {
      dragThreshold: 3,
      levelThreshold: 30
    });

    angularImageDetail.controller('ImageDetailController', function ($scope) {
        $scope.img1 = { 
          src : "http://www.dwuser.com/education/content/creating-responsive-tiled-layout-with-pure-css/images/demo/3.jpg" ,
          name : "jardin",
          id : "3456781",
          tags : "nature"
        };

        $scope.closeImageDetail = function(scope) {
          alert("Go! ImageDetailController.");
        };
      });
    

    angularImageDetail.directive('libraryImageDetail', ['$document', function ($document) {
        return {
          require: '^libraryImage',
          restrict: 'E',
          scope: {
            info: '=info'
          },
          controller : 'ImageDetailController',
          templateUrl: 'http://localhost/workspaces/javascript/loft/ClipartLibrary/app/shared/libraryImageDetail.html',
          link: function(scope, element, attr) {
            var startX = 0, startY = 0, x = 0, y = 0;

            element.css({
             position: 'relative',
             border: '1px solid red',
             backgroundColor: 'lightgrey',
             cursor: 'pointer'
            });          
          }
        };
      }]);

