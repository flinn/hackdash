(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/VanPhan/Documents/hackdash/app/graph.js":[function(require,module,exports){
module.exports = function(app) {
	
	app.run(function() {

		// set up our data series with 50 random data points
		var seriesData = [ [], [], ];
		var random = new Rickshaw.Fixtures.RandomData(150);

		for (var i = 0; i < 150; i++) {
			random.addData(seriesData);
		}

		function getChartWidth() {
			return document.getElementById("graphArea").width;
		}

		// instantiate our graph!

		var graph = new Rickshaw.Graph( {
			element: document.getElementById("chart"),
			width: getChartWidth(),
			height: 300,
			renderer: 'line',
			series: [
				{
					color: "#6060C0",
					data: seriesData[0],
					name: 'Price'
				}, {
					color: "#30c020",
					data: seriesData[1],
					name: 'Glassdoor'
				} 
			]
		} );

		graph.render();

		var hoverDetail = new Rickshaw.Graph.HoverDetail( {
			graph: graph
		} );

		var legend = new Rickshaw.Graph.Legend( {
			graph: graph,
			element: document.getElementById('legend')

		} );

		var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
			graph: graph,
			legend: legend
		} );

		var axes = new Rickshaw.Graph.Axis.Time( {
			graph: graph
		} );
		axes.render();

	});
}

},{}],"/Users/VanPhan/Documents/hackdash/app/index.js":[function(require,module,exports){
var app = angular.module('hackdash', []);

require('./graph')(app);

app.controller('search', function() {
	console.log("Search controller initialized...");
});

app.controller('graph', function() {
	console.log("Graph controller initialized...");
});

require('./search');
},{"./graph":"/Users/VanPhan/Documents/hackdash/app/graph.js","./search":"/Users/VanPhan/Documents/hackdash/app/search.js"}],"/Users/VanPhan/Documents/hackdash/app/search.js":[function(require,module,exports){
module.exports = function() {

	function search() {
		window.location = "/dashboard";
	}
	
};
},{}]},{},["/Users/VanPhan/Documents/hackdash/app/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvZ3JhcGguanMiLCJhcHAvaW5kZXguanMiLCJhcHAvc2VhcmNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBwKSB7XG5cdFxuXHRhcHAucnVuKGZ1bmN0aW9uKCkge1xuXG5cdFx0Ly8gc2V0IHVwIG91ciBkYXRhIHNlcmllcyB3aXRoIDUwIHJhbmRvbSBkYXRhIHBvaW50c1xuXHRcdHZhciBzZXJpZXNEYXRhID0gWyBbXSwgW10sIF07XG5cdFx0dmFyIHJhbmRvbSA9IG5ldyBSaWNrc2hhdy5GaXh0dXJlcy5SYW5kb21EYXRhKDE1MCk7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDE1MDsgaSsrKSB7XG5cdFx0XHRyYW5kb20uYWRkRGF0YShzZXJpZXNEYXRhKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRDaGFydFdpZHRoKCkge1xuXHRcdFx0cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JhcGhBcmVhXCIpLndpZHRoO1xuXHRcdH1cblxuXHRcdC8vIGluc3RhbnRpYXRlIG91ciBncmFwaCFcblxuXHRcdHZhciBncmFwaCA9IG5ldyBSaWNrc2hhdy5HcmFwaCgge1xuXHRcdFx0ZWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFydFwiKSxcblx0XHRcdHdpZHRoOiBnZXRDaGFydFdpZHRoKCksXG5cdFx0XHRoZWlnaHQ6IDMwMCxcblx0XHRcdHJlbmRlcmVyOiAnbGluZScsXG5cdFx0XHRzZXJpZXM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbG9yOiBcIiM2MDYwQzBcIixcblx0XHRcdFx0XHRkYXRhOiBzZXJpZXNEYXRhWzBdLFxuXHRcdFx0XHRcdG5hbWU6ICdQcmljZSdcblx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdGNvbG9yOiBcIiMzMGMwMjBcIixcblx0XHRcdFx0XHRkYXRhOiBzZXJpZXNEYXRhWzFdLFxuXHRcdFx0XHRcdG5hbWU6ICdHbGFzc2Rvb3InXG5cdFx0XHRcdH0gXG5cdFx0XHRdXG5cdFx0fSApO1xuXG5cdFx0Z3JhcGgucmVuZGVyKCk7XG5cblx0XHR2YXIgaG92ZXJEZXRhaWwgPSBuZXcgUmlja3NoYXcuR3JhcGguSG92ZXJEZXRhaWwoIHtcblx0XHRcdGdyYXBoOiBncmFwaFxuXHRcdH0gKTtcblxuXHRcdHZhciBsZWdlbmQgPSBuZXcgUmlja3NoYXcuR3JhcGguTGVnZW5kKCB7XG5cdFx0XHRncmFwaDogZ3JhcGgsXG5cdFx0XHRlbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVnZW5kJylcblxuXHRcdH0gKTtcblxuXHRcdHZhciBzaGVsdmluZyA9IG5ldyBSaWNrc2hhdy5HcmFwaC5CZWhhdmlvci5TZXJpZXMuVG9nZ2xlKCB7XG5cdFx0XHRncmFwaDogZ3JhcGgsXG5cdFx0XHRsZWdlbmQ6IGxlZ2VuZFxuXHRcdH0gKTtcblxuXHRcdHZhciBheGVzID0gbmV3IFJpY2tzaGF3LkdyYXBoLkF4aXMuVGltZSgge1xuXHRcdFx0Z3JhcGg6IGdyYXBoXG5cdFx0fSApO1xuXHRcdGF4ZXMucmVuZGVyKCk7XG5cblx0fSk7XG59XG4iLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2hhY2tkYXNoJywgW10pO1xuXG5yZXF1aXJlKCcuL2dyYXBoJykoYXBwKTtcblxuYXBwLmNvbnRyb2xsZXIoJ3NlYXJjaCcsIGZ1bmN0aW9uKCkge1xuXHRjb25zb2xlLmxvZyhcIlNlYXJjaCBjb250cm9sbGVyIGluaXRpYWxpemVkLi4uXCIpO1xufSk7XG5cbmFwcC5jb250cm9sbGVyKCdncmFwaCcsIGZ1bmN0aW9uKCkge1xuXHRjb25zb2xlLmxvZyhcIkdyYXBoIGNvbnRyb2xsZXIgaW5pdGlhbGl6ZWQuLi5cIik7XG59KTtcblxucmVxdWlyZSgnLi9zZWFyY2gnKTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG5cdGZ1bmN0aW9uIHNlYXJjaCgpIHtcblx0XHR3aW5kb3cubG9jYXRpb24gPSBcIi9kYXNoYm9hcmRcIjtcblx0fVxuXHRcbn07Il19
