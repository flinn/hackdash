module.exports = function(app) {

	app.controller('root', function($scope, $rootScope) {
		console.log("We've got a root controller...");

		$rootScope.searchHist = [];

		$scope.hideDashboard = true;
		$scope.isLoading = false;
		$scope.history = [];

		$scope.hideDash = function() {
			$scope.hideDashboard = true;
		};

		$scope.showDash = function() {
			$scope.hideDashboard = false;
		};

		$scope.updateHistory = function(newHistory) {
			$rootScope.searchHist = newHistory;
			$scope.history = newHistory;
		};

	});

};
