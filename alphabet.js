// thanks to  Mike Bostock - @mbostock for this. Had his source code though did this without too much reference.

var string = 'abcdefghijklmnopqrstuvwyxz'

var alphabet = alpha()

$(document).ready(function() {
  runTheInterval();
})

function alpha() {

  margin = {left: 20, right: 20, top: 20, bottom: 20}

  var w = 600 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

  var svg = d3.select('.alphabet')
      .attr('width', w + margin.left + margin.right)
      .attr('height', h + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

  return function(letters) {

    var texts = svg.selectAll('text')
        .data(letters, function(d) { return d })

    texts.attr('class', 'update')
        .transition()
          .duration(750)
          .attr('x', function(d, i) { return i * 22 })

    texts.enter().append('text')
        .attr('class', 'enter')
        .attr('x', function(d, i) { return i * 22 })
        .attr('y', 50)
        .style("fill-opacity", 1e-6)
        .text(function(d) { return d })
        .transition()
          .duration(750)
          .attr('y', 100)
          .style("fill-opacity", 1)

    texts.exit().attr('class', 'exit')
        .transition()
          .duration(750)
          .attr('y', 150)
          .style("fill-opacity", 1e-6)
          .remove()
  }
}

function runTheInterval() {
  setInterval(function() {
    alphabet(chooseString(string))
  }, 1500)
}

function chooseString(string) {
  var letters = string.split('');

  var newLetters = [];
  var length = Math.floor(Math.random() * 25);

  for (var i = 0; i < length; i++) {
    var index = Math.floor(Math.random() * letters.length);
    newLetters = newLetters.concat(letters.splice(index, 1))
  }

  return newLetters.sort(compare)
}

function compare(a, b) {
  if (a < b)
     return -1;
  if (a > b)
     return 1;
  return 0;
}
