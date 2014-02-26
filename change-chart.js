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
	]
]


var fruitChart = makeFruity();

$(document).ready(function() {
	fruitChart(fruitData[0]);
});

function makeFruity() {

	var margin = {top: 20, right: 30, bottom: 30, left: 40};

	var w = (data.length * 50) - margin.left - margin.right,
	    h = 400 - margin.top - margin.bottom
	var barWidth = w / data.length;

	var svg = d3.select('.svg-transition-chart')
		.attr('width', w + margin.left + margin.right)
		.attr('height', h + margin.top + margin.bottom)		
	  .append('g')
	    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	return function(data) {	
		var bars = svg.selectAll('rect')
			.data(data, function(d) {return d.fruit});

		bars.enter().append('rect')
		  	.attr('class', function(d) { return d.fruit })
		    .attr('width', w / data.length - 1)
		    .attr('height', function(d) { return d.quantity * 50 })
		    .attr('x', function(d, i) { return w / data.length * i })
		    .attr('y', function(d) { return h - (d.quantity * 50)})

		console.log('bars.exit is before: ', bars.exit())
		bars.exit().remove();
		console.log('bars.exit is after: ', bars.exit())
	}

}














