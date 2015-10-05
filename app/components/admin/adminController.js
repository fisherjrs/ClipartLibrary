var adminController = angular.module('adminController', []);

adminController.controller('AdminController', function($rootScope, $scope, $log, $http, EVENTS, RESOURCES){

	$scope.layoutControls = {};
	$scope.debugControls = {};
	$scope.configControls = {};

	$scope.showLayout = true;
	$scope.showConfig = false;
	$scope.showDebug = false;

	$scope.loadConfig = function(designId) {
    	url = RESOURCES.RUNTIME_CONFIG_URL;
	    $http.get(url).
	        then(function(response) {
	            $scope.layoutControls = response.data.layoutControls;
	            $scope.debugControls = response.data.debugControls;
	            $scope.configControls = response.data.configControls;
	            $scope.updateLayout();
	        }, function(response) {
	            $scope.error = "Unable to retrieve category definition."
	        });
	  };

	$scope.displayControls = function(control){
		console.log("display " + control);
		console.log($scope.layoutControls.categoryEditViewControls.control[0]);

		console.log(EVENTS.CLICK);
	};

	$scope.updateLayout = function(){
		$rootScope.$emit('config:layoutChange', $scope.layoutControls);
	};
});