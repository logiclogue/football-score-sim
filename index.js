var NormalDistribution = require('./js/NormalDistribution');

var graph = new NormalDistribution(1.23, 1.04);


console.log(graph.getYValue(3));
console.log(graph.trapeziumRule(0, 4, 1));
