var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

var h = 250;
var w = 600;
var barPadding = 1;
var padding = 30;

var svg = d3.select("body")
            .append("svg")
            .attr({
              height: h,
              width: w
            });

svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr({
    x: function(d, i) { return i * (w / dataset.length) ) },
    y: function(d) { return h - (d * 4) },
    height: function(d) { return d * 4 },
    width: function(d) { return w / dataset.length - barPadding },
    fill: function(d) { return "rgb(0"}
   })


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
