var TrapeziumRule = require('../src/TrapeziumRule');
var assert = require('chai').assert;

describe('TrapeziumRule', function () {
    var trapeziumRule;

    beforeEach(function () {
        trapeziumRule = new TrapeziumRule();
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
    });
});
