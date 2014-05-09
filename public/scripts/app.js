var dataset = [
                  [ 5,     20 ],
                  [ 480,   90 ],
                  [ 250,   50 ],
                  [ 100,   33 ],
                  [ 330,   95 ],
                  [ 410,   12 ],
                  [ 475,   44 ],
                  [ 25,    67 ],
                  [ 85,    21 ],
                  [ 220,   88 ]
              ];

var h = 100;
var w = 500;
var barPadding = 1;

var svg = d3.select("body")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr({
        cx: function(d) { return d[0]; },
        cy: function(d) { return d[1]; },
        r: function(d) { return Math.sqrt(h - d[1]); }
      });

svg.selectAll("text")
     .data(dataset)
     .enter()
     .append("text")
     .text(function(d) { return d[0] + "," + d[1]; }) 
    .attr({
      x: function(d) { return d[0]; },
      y: function(d) { return d[1]; },
      "font-family": "sans-serif",
      "font-size": "11px",
      "fill": "red"
     });


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
