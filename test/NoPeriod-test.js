var assert = require('chai').assert;
var NoPeriod = require('../src/NoPeriod');

describe('NoPeriod', function () {
    var noPeriod;

    beforeEach(function () {
        noPeriod = new NoPeriod();
    });

    describe('#getRelativeTimeFromDate()', function () {
        it('should return 0 time', function () {
            // act
            var result = noPeriod.getRelativeTimeFromDate();

            // assert
            assert.equal(result.getMilliseconds(), 0);
        });
    });
});
