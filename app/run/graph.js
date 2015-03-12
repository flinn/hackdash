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