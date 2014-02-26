var fruitData = [
	[
		{
			fruit: 'bananas',
			quantity: 1
		},
		{
			fruit: 'oranges',
			quantity: 1
		},
		{
			fruit: 'apples',
			quantity: 1
		},
		{
			fruit: 'carrots',
			quantity: 2
		}
	],
	[
		{
			fruit: 'oranges',
			quantity: 1
		},
		{
			fruit: 'apples',
			quantity: 1
		},
		{
			fruit: 'carrots',
			quantity: 1
		}
	],
	[
		{
			fruit: 'bananas',
			quantity: 1
		},
		{
			fruit: 'oranges',
			quantity: 2
		},
		{
			fruit: 'carrots',
			quantity: 1
		}
	],
	[
		{
			fruit: 'bananas',
			quantity: 2
		}
	]
]


var fruitChart = makeFruity(fruitData);

$(document).ready(function() {
	fruitChart(fruitData[0]);
});

function makeFruity(dataSet) {
	var maxWidth = d3.max(dataSet.map(function(data) { return data.length }))

	var margin = {top: 20, right: 30, bottom: 30, left: 40};

	var w = (maxWidth * 50) - margin.left - margin.right,
	// var w = 200 - margin.left - margin.right,
	    h = 400 - margin.top - margin.bottom
	var barWidth = w / maxWidth;

	var svg = d3.select('.svg-transition-chart')
		.attr('width', w + margin.left + margin.right)
		.attr('height', h + margin.top + margin.bottom)		
	  .append('g')
	    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	return function(data) {
		var bars = svg.selectAll('rect')
			.data(data, function(d) {return d.fruit});

		bars.attr('width', barWidth - 1)
		    .transition()
		      .duration(750)
		      .attr('height', function(d) { return d.quantity * 50 })
		      .attr('y', function(d) { return h - (d.quantity * 50)})
		      .attr('x', function(d, i) { return barWidth * i })

		bars.enter().append('rect')
		  	.attr('class', function(d) { return d.fruit })
		  	.attr('height', 0)
		  	.attr('y', h)
			.style("fill-opacity", 1e-6)
		    .attr('width', barWidth - 1)
		    .transition()
		      .duration(750)
		      .style("fill-opacity", 1)
		      .attr('height', function(d) { return d.quantity * 50 })
		      .attr('y', function(d) { return h - (d.quantity * 50)})
		      .attr('x', function(d, i) { return barWidth * i })
		    
		bars.exit()
			.transition()
			  .duration(750)
			  .attr("y", h)
			  .style("fill-opacity", 1e-6)
			  .remove();
	}

}

function happyDance(sel) {
	var index = $(sel).prop('selectedIndex');
	console.log('index is: ', index)
	fruitChart(fruitData[index])
}












