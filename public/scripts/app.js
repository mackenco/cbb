//Width and height
var w = 600;
var h = 250;

var sortOrder = false;

//Create SVG element
var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

//Get the data
d3.json("/guests", function(json) {
  var arr = [];
  for (var key in json) { arr.push(json[key]); }
  return drawStuff(arr);
});

//Create bars
var drawStuff = function(data) {
  console.log(data);
  var dataset = data;

  var xScale = d3.scale.ordinal()
                 .domain(d3.range(dataset.length))
                 .rangeRoundBands([0, w], 0.05);

  var yScale = d3.scale.linear()
                 .domain([0, d3.max(dataset, function(d) { return d.count; })])
                 .range([0, h]);

  svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
      return xScale(i);
   })
   .attr("y", function(d) {
      return h - yScale(d.count);
   })
   .attr("width", xScale.rangeBand())
   .attr("height", function(d) {
      return yScale(d.count);
   })
   .attr("fill", function(d) {
    return "rgb(0, 0, " + (d.count * 10) + ")";
   })
   .on("click", function() {
      sortBars();
   })
   .on("mouseover", function(d) {
    var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
    var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;
    d3.select("#tooltip")
      .style("left", xPosition + "px")
      .style("top", yPosition + "px")
      .select("#value")
      .text(d.name)

    d3.select("#tooltip").classed("hidden", false);
    })
   .on("mouseout", function() {
      d3.select("#tooltip").classed("hidden", true);
 });

var sortBars = function() {
  sortOrder = !sortOrder;

  svg.selectAll("rect")
     .sort(function(a, b) {
        if (sortOrder) { 
          return d3.ascending(a, b);
        } else {
          return d3.descending(a, b);
        }
     })
     .transition()
     .duration(1000)
     .attr("x", function(d, i) {
        return xScale(i);
     });
  };
}
