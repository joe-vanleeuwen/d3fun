// the data the chart will be based on
var data = [4, 8, 15, 16, 23, 42]
d3
$(document).ready(function() {
	d3Check(function() {
		makeChart(data);
		makeSVGChart(data);
		makeSVGVerticalChart(data);
	})
})

// check for d3
function d3Check(fun) {
	if (!d3) {
		console.log('d3 not defined gotta wait')

		setTimeout(function() {
			fun();
		}, 200)
	} else {
		fun();
	}
}

// scale the bars width
scale = d3.scale.linear()
	.domain([0, d3.max(data)])
	.range([0, 410])

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
	    .style('width', function(d) { return scale(d) + 'px'})
	    .text(function(d) { return d });
}

// why svg? 'Whereas HTML is largely limited to rectangular shapes, SVG supports powerful drawing primitives like Bézier curves, gradients, clipping and masks' -- courtesy of http://bost.ocks.org/mike/bar/2/
// makes an SVG chart
function makeSVGChart(data) {
	// setting width of chart and height of the bars
	var width     = 420,
		barHeight =  28;

	// setting the scale
	var scale = d3.scale.linear()
		.domain([0, d3.max(data)])
		.range([0, width]);

	var chart = d3.select('.svg-chart')
		.attr('width', width)
		.attr('height', barHeight * data.length);

	// the g element will be the parent of the rect and text elements 
	var bar = chart.selectAll('g')
		.data(data)
	  .enter().append('g')
	    // positioning the bars vertically. i is index. svg does not use flow positioning like html
	    .attr('transform', function(d, i) { return 'translate(0,' + i * barHeight + ')'; });

	bar.append('rect')
		// width and height are attributes in svg. does not use units (px)
		.attr('width', scale)
		// subtracting from bar height to add vertical spacing between bars
		.attr('height', barHeight - 3);

	bar.append('text')
		// css style has text-anchor: right; so here x is setting text 5 pixels inside of the right side of the bar
		.attr('x', function(d) { return scale(d) - 5; })
		// y positions the text centered vertically?
		.attr('y', barHeight / 2)
		// er the dy centers the text vertically?? ANSWER: they both do . . .
		.attr('dy', '.35em')
		.text(function(d) { return d; });
}

// makes vertical SVG chart
function makeSVGVerticalChart(data) {
	// setting width of chart and height of the bars
	var width    = 168,
		height   = 420;
	var barWidth =  width / data.length;

	// setting the scale
	var y = d3.scale.linear()
		.domain([0, d3.max(data)])
		.range([height, 0]);

	var chart = d3.select('.svg-vertical-chart')
		.attr('width', width)
		.attr('height', height);

	// the g element will be the parent of the rect and text elements 
	var bar = chart.selectAll('g')
		.data(data)
	  .enter().append('g')
	    // positioning the bars vertically. i is index. svg does not use flow positioning like html
	    // .attr('transform', function(d, i) { return 'translate(' + i * barWidth + ',' + (height - y(d)) + ')'; });
	    .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

	bar.append('rect')
		// since the range has the max height at the beginning, this y value will be largest for the first g el
		.attr("y", y)
		// subtracting from bar width to add horizontal spacing between bars
		.attr('width', barWidth - 3)
		// calculating height
		.attr("height", function(d) { return height - y(d); })

	bar.append('text')
		// css style has text-anchor: right; so here x is setting text 5 pixels inside of the right side of the bar
		.attr('x', barWidth / 2)
		// y positions the text centered vertically?
		.attr('y', function(d) { return y(d) + 5; })
		// er the dy centers the text vertically?? ANSWER: they both do . . .
		.attr('dy', '.75em')
		.text(function(d) { return d; });
}






