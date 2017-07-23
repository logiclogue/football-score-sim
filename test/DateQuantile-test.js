var assert = require('chai').assert;
var DateQuantile = require('../src/DateQuantile');
var Time = require('../src/Time');

describe('DateQuantile', function () {
    var dateQuantile;
    var quantile;
    var xCalled;
    var meanCalled;
    var sdCalled;
    var verifyReturnsDate;

    beforeEach(function () {
        verifyReturnsDate = new Date(123213);

        quantile = function (x, mean, sd) {
            xCalled = x;
            meanCalled = mean;
            sdCalled = sd;

            return verifyReturnsDate;
        };

        dateQuantile = new DateQuantile({
            quantile: quantile
        });
    });

    describe('#quantile', function () {
        context('called', function () {
            var result;
            var x;
            var meanDate;
            var sdTime;
            
            beforeEach(function () {
                x = 0.2;
                meanDate = new Date(1000000);
                sdTime = new Time(1000);
                result = dateQuantile.quantile(x, meanDate, sdTime);
            });

            it('should call quantile with x', function () {
                assert.equal(xCalled, x);
            });

            it('should call quantile with milliseconds of the mean date', function() {
                assert.equal(meanCalled, meanDate.getTime());
            });

            it('should call quantile with milliseconds of the standard deviation', function() {
                assert.equal(sdCalled, sdTime.getSeconds());
            });
        });
    });
});
