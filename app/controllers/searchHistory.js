module.exports = function(app) {

	app.controller('searchHistory', function($scope, $rootScope, $p) {

		$scope.searchFor = function(symbol) {
			searchTicker(symbol);
		};

		function searchTicker(symbol) {
			console.log("Searching for ticker with symbol...", symbol);
			$p.post('currentRating', {
				ticker: symbol
			}).then(function(result) {
				addSearchToHistory(symbol);
				refreshDashboard(result);
				console.log("RESULT:", result);
			}, function(err){
				console.log("ERROR:", err);
			});
		}

		function refreshDashboard(result) {
			$rootScope.$broadcast('dashboard.changed', result);
			$scope.showDash();
		}

		function addSearchToHistory(symbol) {
			var history = $rootScope.searchHist;
			var now = moment();
			var record = { ticker: symbol, time: now };
			history.push(record);
			$scope.updateHistory(history.reverse());
		}

	});

};