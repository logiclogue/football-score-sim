var assert = require('chai').assert;
var DateQuantile = require('../src/DateQuantile');
var Time = require('../src/Time');

describe('DateQuantile', function () {
    var dateQuantile;
    var quantile;

    beforeEach(function () {
        dateQuantile = new DateQuantile({});
        quantile = dateQuantile.quantile.bind(dateQuantile);
    });

    describe('#quantile', function () {
        context('called with an x value of 0.5', function () {
            var result;
            var meanDate;
            var standardDeviationTime;
            
            beforeEach(function () {
                meanDate = new Date(1000000);
                standardDeviationTime = new Time(1000);
                result = quantile(0.5, meanDate, standardDeviationTime);
            });

            it('should return the mean date', function () {
                assert.equal(result.getTime(), meanDate.getTime());
            });
        });
    });
});
