module.exports = function(app) {

	app.controller('dashboard', function($scope, $rootScope) {

		$scope.ticker = '';
		$scope.dashboard = {
		};

		$scope.$on('dashboard.changed', function(event, newData) {
			console.log("DASHBOARD HANDLING:::", newData);
			var raw = newData.result.result;
			$scope.ticker = newData.result.ticker;
			$scope.dashboard = raw;
		});
	});

};
