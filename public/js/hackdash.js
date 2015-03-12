(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/VanPhan/Documents/hackdash/app/graph.js":[function(require,module,exports){
var seriesData = [ [], [] ];
var random = new Rickshaw.Fixtures.RandomData(150);

for (var i = 0; i < 150; i++) {
	random.addData(seriesData);
}

// instantiate our graph!

var graph = new Rickshaw.Graph( {
	element: document.getElementById("chart"),
	width: 600,
	height: 400,
	renderer: 'line',
	series: [
		{
			color: "#008cba",
			data: seriesData[0],
			name: 'Stock Price'
		}, {
			color: "#30c020",
			data: seriesData[1],
			name: 'Glassdoor Rating'
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
},{}],"/Users/VanPhan/Documents/hackdash/app/index.js":[function(require,module,exports){
var app = angular.module('hackdash', []);

require('./graph')(app);

app.controller('search', function($scope) {
	console.log("Search controller initialized!");
});

app.controller('graph', function($scope) {
	console.log("Graph controller initialized!");
});

require('./search');
},{"./graph":"/Users/VanPhan/Documents/hackdash/app/graph.js","./search":"/Users/VanPhan/Documents/hackdash/app/search.js"}],"/Users/VanPhan/Documents/hackdash/app/search.js":[function(require,module,exports){
module.exports = function() {

	function search() {
		window.location = "/dashboard";
	}
	
};
},{}]},{},["/Users/VanPhan/Documents/hackdash/app/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvZ3JhcGguanMiLCJhcHAvaW5kZXguanMiLCJhcHAvc2VhcmNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHNlcmllc0RhdGEgPSBbIFtdLCBbXSBdO1xudmFyIHJhbmRvbSA9IG5ldyBSaWNrc2hhdy5GaXh0dXJlcy5SYW5kb21EYXRhKDE1MCk7XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgMTUwOyBpKyspIHtcblx0cmFuZG9tLmFkZERhdGEoc2VyaWVzRGF0YSk7XG59XG5cbi8vIGluc3RhbnRpYXRlIG91ciBncmFwaCFcblxudmFyIGdyYXBoID0gbmV3IFJpY2tzaGF3LkdyYXBoKCB7XG5cdGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcnRcIiksXG5cdHdpZHRoOiA2MDAsXG5cdGhlaWdodDogNDAwLFxuXHRyZW5kZXJlcjogJ2xpbmUnLFxuXHRzZXJpZXM6IFtcblx0XHR7XG5cdFx0XHRjb2xvcjogXCIjMDA4Y2JhXCIsXG5cdFx0XHRkYXRhOiBzZXJpZXNEYXRhWzBdLFxuXHRcdFx0bmFtZTogJ1N0b2NrIFByaWNlJ1xuXHRcdH0sIHtcblx0XHRcdGNvbG9yOiBcIiMzMGMwMjBcIixcblx0XHRcdGRhdGE6IHNlcmllc0RhdGFbMV0sXG5cdFx0XHRuYW1lOiAnR2xhc3Nkb29yIFJhdGluZydcblx0XHR9XG5cdF1cbn0gKTtcblxuZ3JhcGgucmVuZGVyKCk7XG5cbnZhciBsZWdlbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGVnZW5kJyk7XG5cbnZhciBIb3ZlciA9IFJpY2tzaGF3LkNsYXNzLmNyZWF0ZShSaWNrc2hhdy5HcmFwaC5Ib3ZlckRldGFpbCwge1xuXG5cdHJlbmRlcjogZnVuY3Rpb24oYXJncykge1xuXG5cdFx0bGVnZW5kLmlubmVySFRNTCA9IGFyZ3MuZm9ybWF0dGVkWFZhbHVlO1xuXG5cdFx0YXJncy5kZXRhaWwuc29ydChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhLm9yZGVyIC0gYi5vcmRlciB9KS5mb3JFYWNoKCBmdW5jdGlvbihkKSB7XG5cblx0XHRcdHZhciBsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRsaW5lLmNsYXNzTmFtZSA9ICdsaW5lJztcblxuXHRcdFx0dmFyIHN3YXRjaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0c3dhdGNoLmNsYXNzTmFtZSA9ICdzd2F0Y2gnO1xuXHRcdFx0c3dhdGNoLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGQuc2VyaWVzLmNvbG9yO1xuXG5cdFx0XHR2YXIgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdGxhYmVsLmNsYXNzTmFtZSA9ICdsYWJlbCc7XG5cdFx0XHRsYWJlbC5pbm5lckhUTUwgPSBkLm5hbWUgKyBcIjogXCIgKyBkLmZvcm1hdHRlZFlWYWx1ZTtcblxuXHRcdFx0bGluZS5hcHBlbmRDaGlsZChzd2F0Y2gpO1xuXHRcdFx0bGluZS5hcHBlbmRDaGlsZChsYWJlbCk7XG5cblx0XHRcdGxlZ2VuZC5hcHBlbmRDaGlsZChsaW5lKTtcblxuXHRcdFx0dmFyIGRvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0ZG90LmNsYXNzTmFtZSA9ICdkb3QnO1xuXHRcdFx0ZG90LnN0eWxlLnRvcCA9IGdyYXBoLnkoZC52YWx1ZS55MCArIGQudmFsdWUueSkgKyAncHgnO1xuXHRcdFx0ZG90LnN0eWxlLmJvcmRlckNvbG9yID0gZC5zZXJpZXMuY29sb3I7XG5cblx0XHRcdHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChkb3QpO1xuXG5cdFx0XHRkb3QuY2xhc3NOYW1lID0gJ2RvdCBhY3RpdmUnO1xuXG5cdFx0XHR0aGlzLnNob3coKTtcblxuXHRcdH0sIHRoaXMgKTtcbiAgICAgICAgfVxufSk7XG5cbnZhciBob3ZlciA9IG5ldyBIb3ZlciggeyBncmFwaDogZ3JhcGggfSApOyAiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2hhY2tkYXNoJywgW10pO1xuXG5yZXF1aXJlKCcuL2dyYXBoJykoYXBwKTtcblxuYXBwLmNvbnRyb2xsZXIoJ3NlYXJjaCcsIGZ1bmN0aW9uKCRzY29wZSkge1xuXHRjb25zb2xlLmxvZyhcIlNlYXJjaCBjb250cm9sbGVyIGluaXRpYWxpemVkIVwiKTtcbn0pO1xuXG5hcHAuY29udHJvbGxlcignZ3JhcGgnLCBmdW5jdGlvbigkc2NvcGUpIHtcblx0Y29uc29sZS5sb2coXCJHcmFwaCBjb250cm9sbGVyIGluaXRpYWxpemVkIVwiKTtcbn0pO1xuXG5yZXF1aXJlKCcuL3NlYXJjaCcpOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cblx0ZnVuY3Rpb24gc2VhcmNoKCkge1xuXHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiL2Rhc2hib2FyZFwiO1xuXHR9XG5cdFxufTsiXX0=
