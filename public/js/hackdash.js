(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/mflinn/Hack/hackdash/app/graph.js":[function(require,module,exports){
module.exports = function(app) {
	app.run(function() {

		// set up our data series with 50 random data points
		var seriesData = [ [], [] ];
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
					color: "",
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
};

},{}],"/Users/mflinn/Hack/hackdash/app/index.js":[function(require,module,exports){
var app = angular.module('hackdash', []);

require('./graph')(app);

app.controller('search', function($scope) {
	console.log("Search controller initialized!");
});

app.controller('graph', function($scope) {
	console.log("Graph controller initialized!");
});

require('./search');
},{"./graph":"/Users/mflinn/Hack/hackdash/app/graph.js","./search":"/Users/mflinn/Hack/hackdash/app/search.js"}],"/Users/mflinn/Hack/hackdash/app/search.js":[function(require,module,exports){
module.exports = function() {

	function search() {
		window.location = "/dashboard";
	}
	
};
},{}]},{},["/Users/mflinn/Hack/hackdash/app/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbS9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvZ3JhcGguanMiLCJhcHAvaW5kZXguanMiLCJhcHAvc2VhcmNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcHApIHtcblx0YXBwLnJ1bihmdW5jdGlvbigpIHtcblxuXHRcdC8vIHNldCB1cCBvdXIgZGF0YSBzZXJpZXMgd2l0aCA1MCByYW5kb20gZGF0YSBwb2ludHNcblx0XHR2YXIgc2VyaWVzRGF0YSA9IFsgW10sIFtdIF07XG5cdFx0dmFyIHJhbmRvbSA9IG5ldyBSaWNrc2hhdy5GaXh0dXJlcy5SYW5kb21EYXRhKDE1MCk7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDE1MDsgaSsrKSB7XG5cdFx0XHRyYW5kb20uYWRkRGF0YShzZXJpZXNEYXRhKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRDaGFydFdpZHRoKCkge1xuXHRcdFx0cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JhcGhBcmVhXCIpLndpZHRoO1xuXHRcdH1cblxuXHRcdC8vIGluc3RhbnRpYXRlIG91ciBncmFwaCFcblx0XHR2YXIgZ3JhcGggPSBuZXcgUmlja3NoYXcuR3JhcGgoIHtcblx0XHRcdGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcnRcIiksXG5cdFx0XHR3aWR0aDogZ2V0Q2hhcnRXaWR0aCgpLFxuXHRcdFx0aGVpZ2h0OiAzMDAsXG5cdFx0XHRyZW5kZXJlcjogJ2xpbmUnLFxuXHRcdFx0c2VyaWVzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb2xvcjogXCJcIixcblx0XHRcdFx0XHRkYXRhOiBzZXJpZXNEYXRhWzBdLFxuXHRcdFx0XHRcdG5hbWU6ICdQcmljZSdcblx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdGNvbG9yOiBcIiMzMGMwMjBcIixcblx0XHRcdFx0XHRkYXRhOiBzZXJpZXNEYXRhWzFdLFxuXHRcdFx0XHRcdG5hbWU6ICdHbGFzc2Rvb3InXG5cdFx0XHRcdH0gXG5cdFx0XHRdXG5cdFx0fSApO1xuXG5cdFx0Z3JhcGgucmVuZGVyKCk7XG5cblx0XHR2YXIgaG92ZXJEZXRhaWwgPSBuZXcgUmlja3NoYXcuR3JhcGguSG92ZXJEZXRhaWwoIHtcblx0XHRcdGdyYXBoOiBncmFwaFxuXHRcdH0gKTtcblxuXHRcdHZhciBsZWdlbmQgPSBuZXcgUmlja3NoYXcuR3JhcGguTGVnZW5kKCB7XG5cdFx0XHRncmFwaDogZ3JhcGgsXG5cdFx0XHRlbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGVnZW5kJylcblxuXHRcdH0gKTtcblxuXHRcdHZhciBzaGVsdmluZyA9IG5ldyBSaWNrc2hhdy5HcmFwaC5CZWhhdmlvci5TZXJpZXMuVG9nZ2xlKCB7XG5cdFx0XHRncmFwaDogZ3JhcGgsXG5cdFx0XHRsZWdlbmQ6IGxlZ2VuZFxuXHRcdH0gKTtcblxuXHRcdHZhciBheGVzID0gbmV3IFJpY2tzaGF3LkdyYXBoLkF4aXMuVGltZSgge1xuXHRcdFx0Z3JhcGg6IGdyYXBoXG5cdFx0fSApO1xuXHRcdGF4ZXMucmVuZGVyKCk7XG5cblx0fSk7XG59O1xuIiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdoYWNrZGFzaCcsIFtdKTtcblxucmVxdWlyZSgnLi9ncmFwaCcpKGFwcCk7XG5cbmFwcC5jb250cm9sbGVyKCdzZWFyY2gnLCBmdW5jdGlvbigkc2NvcGUpIHtcblx0Y29uc29sZS5sb2coXCJTZWFyY2ggY29udHJvbGxlciBpbml0aWFsaXplZCFcIik7XG59KTtcblxuYXBwLmNvbnRyb2xsZXIoJ2dyYXBoJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cdGNvbnNvbGUubG9nKFwiR3JhcGggY29udHJvbGxlciBpbml0aWFsaXplZCFcIik7XG59KTtcblxucmVxdWlyZSgnLi9zZWFyY2gnKTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG5cdGZ1bmN0aW9uIHNlYXJjaCgpIHtcblx0XHR3aW5kb3cubG9jYXRpb24gPSBcIi9kYXNoYm9hcmRcIjtcblx0fVxuXHRcbn07Il19
