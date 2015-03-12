module.exports = function(app) {

	app.controller('root', function($scope) {
		console.log("We've got a root controller...");

		$scope.hideDashboard = true;

		$scope.submitSearch = function() {
			$scope.hideDashboard = false;
		};

	});

};
