var TrapeziumRule = require('../src/TrapeziumRule');
var assert = require('chai').assert;

describe('TrapeziumRule', function () {
    var trapeziumRule;

    beforeEach(function () {
        trapeziumRule = new TrapeziumRule(0.1, 10000);
    });

    describe('#getArea()', function () {
        context('y = x function', function () {
            var result;

            beforeEach(function () {
                result = trapeziumRule.getArea((x) => x, 0, 1);
            });

            it('should return 0.5', function () {
                assert.equal(result, 0.5);
            });
        });

        context('y = Math.pow(x, 3) from -1 to 1', function () {
            var result;
            
            beforeEach(function () {
                result = trapeziumRule.getArea((x) => Math.pow(x, 3), -1, 1);
            });

            it('should return 0', function () {
                assert.equal(Math.round(result * 1000) / 1000, 0);
            });
        });
    });
});
