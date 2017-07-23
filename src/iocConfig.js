var TrapeziumRule = require('./TrapeziumRule');
var DateQuantile = require('./DateQuantile');
var quantile = require('distributions-normal-quantile');

module.exports = {

    calculateArea: (function () {
        var trapeziumRule = new TrapeziumRule(0.1, 10000);
        var getArea = trapeziumRule.getArea.bind(trapeziumRule);

        return getArea;
    }()),

    quantile: (function () {
        return function (x, mean, standardDeviation) {
            return quantile(x, {
                'mu': mean,
                'sigma': standardDeviation
            });
        };
    }()),

    dateQuantile: (function () {
        var dateQuantileObject = new DateQuantile({});
        var dateQuantile = dateQuantileObject.quantile.bind(dateQuantileObject);

        return dateQuantile;
    }())

};
