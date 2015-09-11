
var angularImage = angular.module('ui.image', [])
    .constant('imageConfig', {
      dragThreshold: 3,
      levelThreshold: 30
    });

    angularImage.controller('ImageController', ['$scope', '$element',
      function ($scope, $element) {
        this.scope = $scope;

        $scope.$element = $element;
        $scope.$nodeScope = null;
        $scope.$type = 'uiImage';

      }
    ]);


    angularImage.directive('uiImage', ['imageConfig', '$window',
      function (imageConfig, $window) {
        return {
          restrict: 'A',
          scope: true,
          controller: 'ImageController',
          template: '<img src="http://www.dwuser.com/education/content/creating-responsive-tiled-layout-with-pure-css/images/demo/3.jpg" />',
          link: function (scope, element, attrs, ctrl) {
            var callbacks = {
              accept: null,
              beforeDrag: null
            },
            config = {};
            angular.extend(config, imageConfig);
          }
        };
      }
    ]);

