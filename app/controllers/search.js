module.exports = function(app) {

	app.controller('search', function($scope, $p, $rootScope) {

		$scope.search = {
			text: ''
		};

		$scope.submitSearch = function() {
			if (isValidSearch()) {
				var ticker = $scope.search.text;
				searchTicker(ticker);
				$scope.search = null;
			}
		};

		function searchTicker(symbol) {
			console.log("Searching for ticker from left nav ... Symbol = ", symbol);
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

		function isValidSearch() {
			return $scope.search.text && $scope.search.text.trim() !== '';
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
