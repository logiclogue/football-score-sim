var calculateArea;
var quantile;
var dateQuantile;
var noPeriod;
var periodFactory;
var onMilliseconds;

module.exports = {

    calculateArea: function () {
        calculateArea = calculateArea || (function () {
            var TrapeziumRule = require('./TrapeziumRule');

            var trapeziumRule = new TrapeziumRule(0.1, 10000);
            var getArea = trapeziumRule.getArea.bind(trapeziumRule);

            return getArea;
        }());

        return calculateArea;
    },

    quantile: function () {
        quantile = quantile || (function () {
            return require('./quantileAdapter');
        }());

        return quantile;
    },

    dateQuantile: function () {
        dateQuantile = dateQuantile || (function () {
            var DateQuantile = require('./DateQuantile');
            var dateQuantileObject = new DateQuantile({});

            return dateQuantileObject.quantile.bind(dateQuantileObject);
        }());

        return dateQuantile;
    },

    noPeriod: function () {
        noPeriod = noPeriod || (function () {
            var NoPeriod = require('./NoPeriod');

            return new NoPeriod();
        }());

        return noPeriod;
    },

    periodFactory: function () {
        periodFactory = periodFactory || (function () {
            var PeriodFactory = require('./PeriodFactory');

            return new PeriodFactory();
        }());

        return periodFactory;
    },

    onMilliseconds: function () {
        onMilliseconds = onMilliseconds || (function () {
            return setTimeout;
        }());

        return onMilliseconds;
    }

};
