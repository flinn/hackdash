(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/mflinn/Hack/hackdash/app/controllers/dashboard.js":[function(require,module,exports){
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

},{}],"/Users/mflinn/Hack/hackdash/app/controllers/graph.js":[function(require,module,exports){
module.exports = function(app) {

	app.controller('graph', function($scope) {
		console.log("We've got a graph controller...");
	});

};

},{}],"/Users/mflinn/Hack/hackdash/app/controllers/root.js":[function(require,module,exports){
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

},{}],"/Users/mflinn/Hack/hackdash/app/controllers/search.js":[function(require,module,exports){
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

},{}],"/Users/mflinn/Hack/hackdash/app/controllers/searchHistory.js":[function(require,module,exports){
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
},{}],"/Users/mflinn/Hack/hackdash/app/index.js":[function(require,module,exports){
var app = angular.module('hackdash', ['parse-angular', 'angularMoment']);

require('./controllers/root')(app);
require('./controllers/search')(app);
require('./controllers/searchHistory')(app);
require('./controllers/graph')(app);
require('./controllers/dashboard')(app);
require('./services/parse')(app);

require('./run/graph')(app);
app.run(function() {
	Parse.initialize('wTCyHepvBQOM57u3Ou13hZ2aWur65esYf8hNLm1L', 'd0IZ7lDqxjHAlCSz9txjh9KZfJOaRD4tYAnsswwA');
	console.log("Parse was initialized!");
});
},{"./controllers/dashboard":"/Users/mflinn/Hack/hackdash/app/controllers/dashboard.js","./controllers/graph":"/Users/mflinn/Hack/hackdash/app/controllers/graph.js","./controllers/root":"/Users/mflinn/Hack/hackdash/app/controllers/root.js","./controllers/search":"/Users/mflinn/Hack/hackdash/app/controllers/search.js","./controllers/searchHistory":"/Users/mflinn/Hack/hackdash/app/controllers/searchHistory.js","./run/graph":"/Users/mflinn/Hack/hackdash/app/run/graph.js","./services/parse":"/Users/mflinn/Hack/hackdash/app/services/parse.js"}],"/Users/mflinn/Hack/hackdash/app/run/graph.js":[function(require,module,exports){
module.exports = function(app) {

	app.run(function() {

		// set up our data series with 50 random data points
		console.log("SETTING GRAPH UP!");

		var seriesData = [ [], [], [] ];
		var random = new Rickshaw.Fixtures.RandomData(150);

		for (var i = 0; i < 150; i++) {
			random.addData(seriesData);
		}

		// instantiate our graph!

		var graph = new Rickshaw.Graph( {
			element: document.getElementById("mainChart"),
			width: 500,
			height: 250,
			renderer: 'line',
			series: [
				{
					color: "#c05020",
					data: seriesData[0],
					name: 'New York'
				}, {
					color: "#30c020",
					data: seriesData[1],
					name: 'London'
				}, {
					color: "#6060c0",
					data: seriesData[2],
					name: 'Tokyo'
				}
			]
		} );

		graph.render();

		var legend = document.querySelector('#legend');

		var Hover = Rickshaw.Class.create(Rickshaw.Graph.HoverDetail, {

			render: function(args) {

				legend.innerHTML = args.formattedXValue;

				args.detail.sort(function(a, b) { return a.order - b.order }).forEach( function(d) {

					var line = document.createElement('div');
					line.className = 'line';

					var swatch = document.createElement('div');
					swatch.className = 'swatch';
					swatch.style.backgroundColor = d.series.color;

					var label = document.createElement('div');
					label.className = 'label';
					label.innerHTML = d.name + ": " + d.formattedYValue;

					line.appendChild(swatch);
					line.appendChild(label);

					legend.appendChild(line);

					var dot = document.createElement('div');
					dot.className = 'dot';
					dot.style.top = graph.y(d.value.y0 + d.value.y) + 'px';
					dot.style.borderColor = d.series.color;

					this.element.appendChild(dot);

					dot.className = 'dot active';

					this.show();

				}, this );
		        }
		});

		var hover = new Hover( { graph: graph } );

	});

};
},{}],"/Users/mflinn/Hack/hackdash/app/services/parse.js":[function(require,module,exports){
module.exports = function(app) {
	app.service('$p',
      function($http, $rootScope, $q) {
          function parseCall(method, parseFuncName, data) {
              var deferred = $q.defer();

              $http({
                  method: method,
                  url: 'https://api.parse.com/1/functions/' + parseFuncName,
                  headers: {
                      'X-Parse-REST-API-Key': 'b3L7AlI1rCzEsXofXzp7kbETwS8nDukouhRjmqeU',
                      'X-Parse-Application-Id': 'wTCyHepvBQOM57u3Ou13hZ2aWur65esYf8hNLm1L',
                      'Content-Type': 'application/json'
                  },
                  data: data
              }).success(function(result) {
                  deferred.resolve(result);
              }).error(function(err) {
                  deferred.reject(err);
              });

              return deferred.promise;
          }

          this.post = function(parseFuncName, data) {
              return parseCall('post', parseFuncName, data);
          };

          this.put = function(parseFuncName, data) {
              return parseCall('put', parseFuncName, data);
          };

          this.get = function(parseFuncName, data) {
              return parseCall('get', parseFuncName, data);
          };

          this.patch = function(parseFuncName, data) {
              return parseCall('patch', parseFuncName, data);
          };

          this.del = function(parseFuncName, data) {
              return parseCall('delete', parseFuncName, data);
          };
      }
  );
};
},{}]},{},["/Users/mflinn/Hack/hackdash/app/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbS9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvY29udHJvbGxlcnMvZGFzaGJvYXJkLmpzIiwiYXBwL2NvbnRyb2xsZXJzL2dyYXBoLmpzIiwiYXBwL2NvbnRyb2xsZXJzL3Jvb3QuanMiLCJhcHAvY29udHJvbGxlcnMvc2VhcmNoLmpzIiwiYXBwL2NvbnRyb2xsZXJzL3NlYXJjaEhpc3RvcnkuanMiLCJhcHAvaW5kZXguanMiLCJhcHAvcnVuL2dyYXBoLmpzIiwiYXBwL3NlcnZpY2VzL3BhcnNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG5cblx0YXBwLmNvbnRyb2xsZXIoJ2Rhc2hib2FyZCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSkge1xuXG5cdFx0JHNjb3BlLnRpY2tlciA9ICcnO1xuXHRcdCRzY29wZS5kYXNoYm9hcmQgPSB7XG5cdFx0fTtcblxuXHRcdCRzY29wZS4kb24oJ2Rhc2hib2FyZC5jaGFuZ2VkJywgZnVuY3Rpb24oZXZlbnQsIG5ld0RhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiREFTSEJPQVJEIEhBTkRMSU5HOjo6XCIsIG5ld0RhdGEpO1xuXHRcdFx0dmFyIHJhdyA9IG5ld0RhdGEucmVzdWx0LnJlc3VsdDtcblx0XHRcdCRzY29wZS50aWNrZXIgPSBuZXdEYXRhLnJlc3VsdC50aWNrZXI7XG5cdFx0XHQkc2NvcGUuZGFzaGJvYXJkID0gcmF3O1xuXHRcdH0pO1xuXHR9KTtcblxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG5cblx0YXBwLmNvbnRyb2xsZXIoJ2dyYXBoJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cdFx0Y29uc29sZS5sb2coXCJXZSd2ZSBnb3QgYSBncmFwaCBjb250cm9sbGVyLi4uXCIpO1xuXHR9KTtcblxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG5cblx0YXBwLmNvbnRyb2xsZXIoJ3Jvb3QnLCBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUpIHtcblx0XHRjb25zb2xlLmxvZyhcIldlJ3ZlIGdvdCBhIHJvb3QgY29udHJvbGxlci4uLlwiKTtcblxuXHRcdCRyb290U2NvcGUuc2VhcmNoSGlzdCA9IFtdO1xuXG5cdFx0JHNjb3BlLmhpZGVEYXNoYm9hcmQgPSB0cnVlO1xuXHRcdCRzY29wZS5pc0xvYWRpbmcgPSBmYWxzZTtcblx0XHQkc2NvcGUuaGlzdG9yeSA9IFtdO1xuXG5cdFx0JHNjb3BlLmhpZGVEYXNoID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQkc2NvcGUuaGlkZURhc2hib2FyZCA9IHRydWU7XG5cdFx0fTtcblxuXHRcdCRzY29wZS5zaG93RGFzaCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0JHNjb3BlLmhpZGVEYXNoYm9hcmQgPSBmYWxzZTtcblx0XHR9O1xuXG5cdFx0JHNjb3BlLnVwZGF0ZUhpc3RvcnkgPSBmdW5jdGlvbihuZXdIaXN0b3J5KSB7XG5cdFx0XHQkcm9vdFNjb3BlLnNlYXJjaEhpc3QgPSBuZXdIaXN0b3J5O1xuXHRcdFx0JHNjb3BlLmhpc3RvcnkgPSBuZXdIaXN0b3J5O1xuXHRcdH07XG5cblx0fSk7XG5cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwcCkge1xuXG5cdGFwcC5jb250cm9sbGVyKCdzZWFyY2gnLCBmdW5jdGlvbigkc2NvcGUsICRwLCAkcm9vdFNjb3BlKSB7XG5cblx0XHQkc2NvcGUuc2VhcmNoID0ge1xuXHRcdFx0dGV4dDogJydcblx0XHR9O1xuXG5cdFx0JHNjb3BlLnN1Ym1pdFNlYXJjaCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKGlzVmFsaWRTZWFyY2goKSkge1xuXHRcdFx0XHR2YXIgdGlja2VyID0gJHNjb3BlLnNlYXJjaC50ZXh0O1xuXHRcdFx0XHRzZWFyY2hUaWNrZXIodGlja2VyKTtcblx0XHRcdFx0JHNjb3BlLnNlYXJjaCA9IG51bGw7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGZ1bmN0aW9uIHNlYXJjaFRpY2tlcihzeW1ib2wpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIGZvciB0aWNrZXIgZnJvbSBsZWZ0IG5hdiAuLi4gU3ltYm9sID0gXCIsIHN5bWJvbCk7XG5cdFx0XHQkcC5wb3N0KCdjdXJyZW50UmF0aW5nJywge1xuXHRcdFx0XHR0aWNrZXI6IHN5bWJvbFxuXHRcdFx0fSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcblx0XHRcdFx0YWRkU2VhcmNoVG9IaXN0b3J5KHN5bWJvbCk7XG5cdFx0XHRcdHJlZnJlc2hEYXNoYm9hcmQocmVzdWx0KTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJSRVNVTFQ6XCIsIHJlc3VsdCk7XG5cdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkVSUk9SOlwiLCBlcnIpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gaXNWYWxpZFNlYXJjaCgpIHtcblx0XHRcdHJldHVybiAkc2NvcGUuc2VhcmNoLnRleHQgJiYgJHNjb3BlLnNlYXJjaC50ZXh0LnRyaW0oKSAhPT0gJyc7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVmcmVzaERhc2hib2FyZChyZXN1bHQpIHtcblx0XHRcdCRyb290U2NvcGUuJGJyb2FkY2FzdCgnZGFzaGJvYXJkLmNoYW5nZWQnLCByZXN1bHQpO1xuXHRcdFx0JHNjb3BlLnNob3dEYXNoKCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYWRkU2VhcmNoVG9IaXN0b3J5KHN5bWJvbCkge1xuXHRcdFx0dmFyIGhpc3RvcnkgPSAkcm9vdFNjb3BlLnNlYXJjaEhpc3Q7XG5cdFx0XHR2YXIgbm93ID0gbW9tZW50KCk7XG5cdFx0XHR2YXIgcmVjb3JkID0geyB0aWNrZXI6IHN5bWJvbCwgdGltZTogbm93IH07XG5cdFx0XHRoaXN0b3J5LnB1c2gocmVjb3JkKTtcblx0XHRcdCRzY29wZS51cGRhdGVIaXN0b3J5KGhpc3RvcnkucmV2ZXJzZSgpKTtcblx0XHR9XG5cblxuXHR9KTtcblxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG5cblx0YXBwLmNvbnRyb2xsZXIoJ3NlYXJjaEhpc3RvcnknLCBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICRwKSB7XG5cblx0XHQkc2NvcGUuc2VhcmNoRm9yID0gZnVuY3Rpb24oc3ltYm9sKSB7XG5cdFx0XHRzZWFyY2hUaWNrZXIoc3ltYm9sKTtcblx0XHR9O1xuXG5cdFx0ZnVuY3Rpb24gc2VhcmNoVGlja2VyKHN5bWJvbCkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJTZWFyY2hpbmcgZm9yIHRpY2tlciB3aXRoIHN5bWJvbC4uLlwiLCBzeW1ib2wpO1xuXHRcdFx0JHAucG9zdCgnY3VycmVudFJhdGluZycsIHtcblx0XHRcdFx0dGlja2VyOiBzeW1ib2xcblx0XHRcdH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG5cdFx0XHRcdGFkZFNlYXJjaFRvSGlzdG9yeShzeW1ib2wpO1xuXHRcdFx0XHRyZWZyZXNoRGFzaGJvYXJkKHJlc3VsdCk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiUkVTVUxUOlwiLCByZXN1bHQpO1xuXHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJFUlJPUjpcIiwgZXJyKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHJlZnJlc2hEYXNoYm9hcmQocmVzdWx0KSB7XG5cdFx0XHQkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2Rhc2hib2FyZC5jaGFuZ2VkJywgcmVzdWx0KTtcblx0XHRcdCRzY29wZS5zaG93RGFzaCgpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGFkZFNlYXJjaFRvSGlzdG9yeShzeW1ib2wpIHtcblx0XHRcdHZhciBoaXN0b3J5ID0gJHJvb3RTY29wZS5zZWFyY2hIaXN0O1xuXHRcdFx0dmFyIG5vdyA9IG1vbWVudCgpO1xuXHRcdFx0dmFyIHJlY29yZCA9IHsgdGlja2VyOiBzeW1ib2wsIHRpbWU6IG5vdyB9O1xuXHRcdFx0aGlzdG9yeS5wdXNoKHJlY29yZCk7XG5cdFx0XHQkc2NvcGUudXBkYXRlSGlzdG9yeShoaXN0b3J5LnJldmVyc2UoKSk7XG5cdFx0fVxuXG5cdH0pO1xuXG59OyIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnaGFja2Rhc2gnLCBbJ3BhcnNlLWFuZ3VsYXInLCAnYW5ndWxhck1vbWVudCddKTtcblxucmVxdWlyZSgnLi9jb250cm9sbGVycy9yb290JykoYXBwKTtcbnJlcXVpcmUoJy4vY29udHJvbGxlcnMvc2VhcmNoJykoYXBwKTtcbnJlcXVpcmUoJy4vY29udHJvbGxlcnMvc2VhcmNoSGlzdG9yeScpKGFwcCk7XG5yZXF1aXJlKCcuL2NvbnRyb2xsZXJzL2dyYXBoJykoYXBwKTtcbnJlcXVpcmUoJy4vY29udHJvbGxlcnMvZGFzaGJvYXJkJykoYXBwKTtcbnJlcXVpcmUoJy4vc2VydmljZXMvcGFyc2UnKShhcHApO1xuXG5yZXF1aXJlKCcuL3J1bi9ncmFwaCcpKGFwcCk7XG5hcHAucnVuKGZ1bmN0aW9uKCkge1xuXHRQYXJzZS5pbml0aWFsaXplKCd3VEN5SGVwdkJRT001N3UzT3UxM2haMmFXdXI2NWVzWWY4aE5MbTFMJywgJ2QwSVo3bERxeGpIQWxDU3o5dHhqaDlLWmZKT2FSRDR0WUFuc3N3d0EnKTtcblx0Y29uc29sZS5sb2coXCJQYXJzZSB3YXMgaW5pdGlhbGl6ZWQhXCIpO1xufSk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcblxuXHRhcHAucnVuKGZ1bmN0aW9uKCkge1xuXG5cdFx0Ly8gc2V0IHVwIG91ciBkYXRhIHNlcmllcyB3aXRoIDUwIHJhbmRvbSBkYXRhIHBvaW50c1xuXHRcdGNvbnNvbGUubG9nKFwiU0VUVElORyBHUkFQSCBVUCFcIik7XG5cblx0XHR2YXIgc2VyaWVzRGF0YSA9IFsgW10sIFtdLCBbXSBdO1xuXHRcdHZhciByYW5kb20gPSBuZXcgUmlja3NoYXcuRml4dHVyZXMuUmFuZG9tRGF0YSgxNTApO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxNTA7IGkrKykge1xuXHRcdFx0cmFuZG9tLmFkZERhdGEoc2VyaWVzRGF0YSk7XG5cdFx0fVxuXG5cdFx0Ly8gaW5zdGFudGlhdGUgb3VyIGdyYXBoIVxuXG5cdFx0dmFyIGdyYXBoID0gbmV3IFJpY2tzaGF3LkdyYXBoKCB7XG5cdFx0XHRlbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5DaGFydFwiKSxcblx0XHRcdHdpZHRoOiA1MDAsXG5cdFx0XHRoZWlnaHQ6IDI1MCxcblx0XHRcdHJlbmRlcmVyOiAnbGluZScsXG5cdFx0XHRzZXJpZXM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbG9yOiBcIiNjMDUwMjBcIixcblx0XHRcdFx0XHRkYXRhOiBzZXJpZXNEYXRhWzBdLFxuXHRcdFx0XHRcdG5hbWU6ICdOZXcgWW9yaydcblx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdGNvbG9yOiBcIiMzMGMwMjBcIixcblx0XHRcdFx0XHRkYXRhOiBzZXJpZXNEYXRhWzFdLFxuXHRcdFx0XHRcdG5hbWU6ICdMb25kb24nXG5cdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRjb2xvcjogXCIjNjA2MGMwXCIsXG5cdFx0XHRcdFx0ZGF0YTogc2VyaWVzRGF0YVsyXSxcblx0XHRcdFx0XHRuYW1lOiAnVG9reW8nXG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9ICk7XG5cblx0XHRncmFwaC5yZW5kZXIoKTtcblxuXHRcdHZhciBsZWdlbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGVnZW5kJyk7XG5cblx0XHR2YXIgSG92ZXIgPSBSaWNrc2hhdy5DbGFzcy5jcmVhdGUoUmlja3NoYXcuR3JhcGguSG92ZXJEZXRhaWwsIHtcblxuXHRcdFx0cmVuZGVyOiBmdW5jdGlvbihhcmdzKSB7XG5cblx0XHRcdFx0bGVnZW5kLmlubmVySFRNTCA9IGFyZ3MuZm9ybWF0dGVkWFZhbHVlO1xuXG5cdFx0XHRcdGFyZ3MuZGV0YWlsLnNvcnQoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYS5vcmRlciAtIGIub3JkZXIgfSkuZm9yRWFjaCggZnVuY3Rpb24oZCkge1xuXG5cdFx0XHRcdFx0dmFyIGxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdFx0XHRsaW5lLmNsYXNzTmFtZSA9ICdsaW5lJztcblxuXHRcdFx0XHRcdHZhciBzd2F0Y2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdFx0XHRzd2F0Y2guY2xhc3NOYW1lID0gJ3N3YXRjaCc7XG5cdFx0XHRcdFx0c3dhdGNoLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGQuc2VyaWVzLmNvbG9yO1xuXG5cdFx0XHRcdFx0dmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRcdFx0bGFiZWwuY2xhc3NOYW1lID0gJ2xhYmVsJztcblx0XHRcdFx0XHRsYWJlbC5pbm5lckhUTUwgPSBkLm5hbWUgKyBcIjogXCIgKyBkLmZvcm1hdHRlZFlWYWx1ZTtcblxuXHRcdFx0XHRcdGxpbmUuYXBwZW5kQ2hpbGQoc3dhdGNoKTtcblx0XHRcdFx0XHRsaW5lLmFwcGVuZENoaWxkKGxhYmVsKTtcblxuXHRcdFx0XHRcdGxlZ2VuZC5hcHBlbmRDaGlsZChsaW5lKTtcblxuXHRcdFx0XHRcdHZhciBkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdFx0XHRkb3QuY2xhc3NOYW1lID0gJ2RvdCc7XG5cdFx0XHRcdFx0ZG90LnN0eWxlLnRvcCA9IGdyYXBoLnkoZC52YWx1ZS55MCArIGQudmFsdWUueSkgKyAncHgnO1xuXHRcdFx0XHRcdGRvdC5zdHlsZS5ib3JkZXJDb2xvciA9IGQuc2VyaWVzLmNvbG9yO1xuXG5cdFx0XHRcdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGRvdCk7XG5cblx0XHRcdFx0XHRkb3QuY2xhc3NOYW1lID0gJ2RvdCBhY3RpdmUnO1xuXG5cdFx0XHRcdFx0dGhpcy5zaG93KCk7XG5cblx0XHRcdFx0fSwgdGhpcyApO1xuXHRcdCAgICAgICAgfVxuXHRcdH0pO1xuXG5cdFx0dmFyIGhvdmVyID0gbmV3IEhvdmVyKCB7IGdyYXBoOiBncmFwaCB9ICk7XG5cblx0fSk7XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcblx0YXBwLnNlcnZpY2UoJyRwJyxcbiAgICAgIGZ1bmN0aW9uKCRodHRwLCAkcm9vdFNjb3BlLCAkcSkge1xuICAgICAgICAgIGZ1bmN0aW9uIHBhcnNlQ2FsbChtZXRob2QsIHBhcnNlRnVuY05hbWUsIGRhdGEpIHtcbiAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgICAkaHR0cCh7XG4gICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vYXBpLnBhcnNlLmNvbS8xL2Z1bmN0aW9ucy8nICsgcGFyc2VGdW5jTmFtZSxcbiAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAnWC1QYXJzZS1SRVNULUFQSS1LZXknOiAnYjNMN0FsSTFyQ3pFc1hvZlh6cDdrYkVUd1M4bkR1a291aFJqbXFlVScsXG4gICAgICAgICAgICAgICAgICAgICAgJ1gtUGFyc2UtQXBwbGljYXRpb24tSWQnOiAnd1RDeUhlcHZCUU9NNTd1M091MTNoWjJhV3VyNjVlc1lmOGhOTG0xTCcsXG4gICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICAgICAgfSkuc3VjY2VzcyhmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgfSkuZXJyb3IoZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5wb3N0ID0gZnVuY3Rpb24ocGFyc2VGdW5jTmFtZSwgZGF0YSkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyc2VDYWxsKCdwb3N0JywgcGFyc2VGdW5jTmFtZSwgZGF0YSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHRoaXMucHV0ID0gZnVuY3Rpb24ocGFyc2VGdW5jTmFtZSwgZGF0YSkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyc2VDYWxsKCdwdXQnLCBwYXJzZUZ1bmNOYW1lLCBkYXRhKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdGhpcy5nZXQgPSBmdW5jdGlvbihwYXJzZUZ1bmNOYW1lLCBkYXRhKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJzZUNhbGwoJ2dldCcsIHBhcnNlRnVuY05hbWUsIGRhdGEpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB0aGlzLnBhdGNoID0gZnVuY3Rpb24ocGFyc2VGdW5jTmFtZSwgZGF0YSkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyc2VDYWxsKCdwYXRjaCcsIHBhcnNlRnVuY05hbWUsIGRhdGEpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB0aGlzLmRlbCA9IGZ1bmN0aW9uKHBhcnNlRnVuY05hbWUsIGRhdGEpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlQ2FsbCgnZGVsZXRlJywgcGFyc2VGdW5jTmFtZSwgZGF0YSk7XG4gICAgICAgICAgfTtcbiAgICAgIH1cbiAgKTtcbn07Il19
