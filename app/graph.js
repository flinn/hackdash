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
