(function() {
  'use strict';

  angular.module('treesApp', ['ui.tree'])
  .controller('treesCtrl', function($scope) {

    $scope.categoryEditMode = false;
    $scope.selectedItemId = -1;

    $scope.remove = function(scope) {
      scope.remove();
    };

    $scope.toggle = function(scope) {
      scope.toggle();
    };

    $scope.newSubItem = function(scope) {
      var nodeData = scope.$modelValue;
      nodeData.nodes.push({
        id: nodeData.id * 10 + nodeData.nodes.length,
        title: nodeData.title + '.' + (nodeData.nodes.length + 1),
        nodes: []
      });
    };

    $scope.selectItem = function(scope) {
      var nodeData = scope.$modelValue;
      alert("Go! " + nodeData.title);
    };

    $scope.editItem = function(scope) {
      var nodeData = scope.$modelValue;
      $scope.categoryEditMode = true;
      $scope.selectedItemId = nodeData.id;
      alert("Go! " + nodeData.title);
    };

    $scope.updateItem = function(scope) {
      var nodeData = scope.$modelValue;
      $scope.categoryEditMode = false;
      $scope.selectedItemId = null;
      alert("Go! " + nodeData.title);
    };

    $scope.deleteItem = function(scope) {
      var nodeData = scope.$modelValue;
      $scope.categoryEditMode = false;
      $scope.selectedItemId = null;
      scope.remove();
    };

    $scope.tree1 = [{
      "id": 1,
      "title": "tree1 - item1",
      "nodes": [],
    }, {
      "id": 2,
      "title": "tree1 - item2",
      "nodes": [],
    }, {
      "id": 3,
      "title": "tree1 - item3",
      "nodes": [],
    }, {
      "id": 4,
      "title": "tree1 - item4",
      "nodes": [],
    }];
    $scope.tree2 = [{
      "id": 1,
      "title": "tree2 - item1",
      "nodes": [],
    }, {
      "id": 2,
      "title": "tree2 - item2",
      "nodes": [],
    }, {
      "id": 3,
      "title": "tree2 - item3",
      "nodes": [],
    }, {
      "id": 4,
      "title": "tree2 - item4",
      "nodes": [],
    }];
  });

})();