var TrapeziumRule = require('./TrapeziumRule');
var quantile = require('distributions-normal-quantile');

module.exports = {

    calculateArea: (function () {
        var trapeziumRule = new TrapeziumRule(0.1, 10000);
        var getArea = trapeziumRule.getArea.bind(trapeziumRule);

        return getArea;
    }()),

    quantile: (function (mean, standardDeviation) {
        return function (x) {
            return quantile(x, {
                'mu': mean,
                'sigma': standardDeviation
            });
        };
    }())

};
