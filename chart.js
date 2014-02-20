// the data the chart will be based on
var data = [4, 8, 15, 16, 23, 42]

$(document).ready(function() {
	makeChart(data);
})

// scale the bars width
function scale(d) {
	x = d3.scale.linear()
		.domain([0, d3.max(data)])
		.range([0, 800])

	// x is a function returned from d3.scale.linear()
	return x(d);
}

// makes the chart
function makeChart(data) {
	// select the parent el
	d3.select('.chart')
	  // tells d3 what els to bind the data with, even though these els aren't in the DOM yet
	  .selectAll('div')
	  	// binding the data to the els
		.data(data)
	  // since .chart was empty, .enter() returns the new els to be appended to .chart
	  .enter().append('div')
	  .attr('class', 'bar')
	    // the callback functions expect an argument that refrences the binded data. using scale here to have the appropriately scaled width
	    .style('width', function(d) { return scale(d) + 'px'} )
	    .text(function(d) { return d } )
}