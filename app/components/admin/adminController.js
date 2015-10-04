var adminController = angular.module('adminController', []);

adminController.controller('AdminController', function($scope, $log, $http, EVENTS, RESOURCES){

	// var lc = {};
	// lc.categoryEditView = {};
	// lc.categoryEditView.control = ['form', 'tree'];
	// lc.imageDetailView = {};
	// lc.imageDetailView.features = {};
	// lc.imageDetailView
	$scope.layoutControls = {};
	$scope.debugControls = {};
	$scope.configControls = {};

	$scope.loadConfig = function(designId) {
    	url = RESOURCES.RUNTIME_CONFIG_URL;
	    $http.get(url).
	        then(function(response) {
	            $scope.layoutControls = response.data.layoutControls;
	            $scope.debugControls = response.data.debugControls;
	            $scope.configControls = response.data.configControls;
	        }, function(response) {
	            $scope.error = "Unable to retrieve category definition."
	        });
	  };

	$scope.displayControls = function(control){
		console.log("display " + control);
		console.log($scope.layoutControls.categoryEditViewControls.control[0]);

		console.log(EVENTS.CLICK);
	};
});