//Width and height
var w = 600;
var h = 250;

var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
        11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

var sortOrder = false;

var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset)])
        .range([0, h]);

//Create SVG element
var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

//Create bars
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
      return xScale(i);
   })
   .attr("y", function(d) {
      return h - yScale(d);
   })
   .attr("width", xScale.rangeBand())
   .attr("height", function(d) {
      return yScale(d);
   })
   .attr("fill", function(d) {
    return "rgb(0, 0, " + (d * 10) + ")";
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
      .text(d)

    d3.select("#tooltip").classed("hidden", false);
    })
   .on("mouseout", function() {
      d3.select("#tooltip").classed("hidden", true);
   });

//Create labels
// svg.selectAll("text")
//    .data(dataset)
//    .enter()
//    .append("text")
//    .text(function(d) {
//       return d;
//    })
//    .attr("text-anchor", "middle")
//    .attr("x", function(d, i) {
//       return xScale(i) + xScale.rangeBand() / 2;
//    })
//    .attr("y", function(d) {
//       return h - yScale(d) + 14;
//    })
//    .attr("font-family", "sans-serif")
//    .attr("font-size", "11px")
//    .attr("fill", "white");

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

// var h = 500;
// var w = 4000;
// var barPadding = 1;

// var svg = d3.select("body")
//             .append("svg")
//             .attr("width", w)
//             .attr("height", h);

// d3.json("/guests", function(json) {
//   var arr = [];
//   for (var key in json) { arr.push(json[key]); }
//   return drawStuff(arr);
// });

// var drawStuff = function(data) {
//   var dataset = data;
//   svg.selectAll("rect")
//    .data(dataset)
//    .enter()
//    .append("rect")
//    .attr({
//       x: function(d, i) { return i * (w / dataset.length); },
//       y: function(d) { return h - d.count*4; },
//       width: w / dataset.length - barPadding,
//       height: function(d) { return d.count * 4; },
//       fill: function(d) { return "rgb(0, 0, " + (d.count * 10) + ")";}
//     });

// svg.selectAll("text")
//    .data(dataset)
//    .enter()
//    .append("text")
//    .text(function(d) { return d.count; })
//    .attr({
//       x: function(d, i) { return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2; },
//       y: function(d) { return h - (d.count * 4) + 14; },
//       "font-family": "sans-serif",
//       "font-size": "11px",
//       fill: "white",
//       "text-anchor": "middle"
//    });
// };
