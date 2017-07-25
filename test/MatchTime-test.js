var assert = require('chai').assert;
var sinon = require('sinon');
var MatchTime = require('../src/MatchTime');
var Time = require('../src/Time');

describe('MatchTime', function () {
    var matchTime;
    var period;
    var date;

    beforeEach(function () {
        matchTime = new MatchTime(new Time(5), new Time(2));
    });

    describe('#getTime()', function () {
        it('should return the sum of normal and injury time', function () {
            // act
            var result = matchTime.getTime();

            // assert
            assert.equal(result.getMilliseconds(), 7);
        });
    });
});
