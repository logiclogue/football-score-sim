var assert = require('chai').assert;
var NoPeriod = require('../src/NoPeriod');

describe('NoPeriod', function () {
    var noPeriod;

    beforeEach(function () {
        noPeriod = new NoPeriod();
    });

    describe('#calculateMatchTime()', function () {
        it('should return 0 normal time', function () {
            // act
            var result = noPeriod
                .calculateMatchTime()
                .getNormalTimeComponent();

            // assert
            assert.equal(result.getMilliseconds(), 0);
        });

        it('should return 0 injuryTime time', function () {
            // act
            var result = noPeriod
                .calculateMatchTime()
                .getInjuryTimeComponent();

            // assert
            assert.equal(result.getMilliseconds(), 0);
        });
    });
});
