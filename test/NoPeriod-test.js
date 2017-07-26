var assert = require('chai').assert;
var NoPeriod = require('../src/NoPeriod');

describe('NoPeriod', function () {
    var noPeriod;

    beforeEach(function () {
        noPeriod = new NoPeriod();
    });

    describe('#getRelativeTimeFromDate()', function () {
        it('should return 0 normal time', function () {
            // act
            var result = noPeriod
                .getRelativeTimeFromDate()
                .getNormalTimeComponent();

            // assert
            assert.equal(result.getMilliseconds(), 0);
        });

        it('should return 0 injuryTime time', function () {
            // act
            var result = noPeriod
                .getRelativeTimeFromDate()
                .getInjuryTimeComponent();

            // assert
            assert.equal(result.getMilliseconds(), 0);
        });
    });
});
