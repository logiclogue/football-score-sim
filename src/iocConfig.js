var TrapeziumRule;
var DateQuantile;
var quantile;
var NoPeriod;
var PeriodFactory;

function load() {
    TrapeziumRule = require('./TrapeziumRule');
    DateQuantile = require('./DateQuantile');
    quantile = require('distributions-normal-quantile');
    NoPeriod = require('./NoPeriod');
    PeriodFactory = require('./PeriodFactory');
}

module.exports = {

    calculateArea: function () {
        load();

        var trapeziumRule = new TrapeziumRule(0.1, 10000);
        var getArea = trapeziumRule.getArea.bind(trapeziumRule);

        return getArea;
    },

    quantile: function () {
        load();

        return function (x, mean, standardDeviation) {
            return quantile(x, {
                'mu': mean,
                'sigma': standardDeviation
            });
        };
    },

    dateQuantile: function () {
        load();

        var dateQuantileObject = new DateQuantile({});
        var dateQuantile = dateQuantileObject.quantile.bind(dateQuantileObject);

        return dateQuantile;
    },

    noPeriod: function () {
        load();

        return new NoPeriod();
    },

    periodFactory: function () {
        load();

        return new PeriodFactory();
    }

};
