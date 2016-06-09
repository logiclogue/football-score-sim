var NormalDistribution = require('./js/NormalDistribution');

var graph = new NormalDistribution(1.23, 1.04);


console.log(graph.getYValue(3));
console.log(graph.trapeziumRule(-10, 2, 0.1) - graph.trapeziumRule(-10, 1, 0.1));
console.log(graph.trapeziumRule(4, 5, 0.1))
