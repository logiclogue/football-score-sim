var assert = require('chai').assert;
var Match = require('../src/Match');
var MatchOutputter = require('../src/MatchOutputter');
var common = require('./common');


describe('Match', function () {
    var match = new Match(common.matchParams);

    describe('#simulate()', function () {
        it('should return the same score as #score property', function () {
            assert.equal(match.simulate(), match.score);
        });
    });

    describe('#startTime', function () {
        var startTime = common.matchParams.startTime;

        it('should set the first half start time', function () {
            var firstHalfStartTime = match.firstHalf.startTime;
            
            assert.equal(firstHalfStartTime, startTime);
        });

        it('should always set startTime as instance of Date', function () {
            delete common.matchParams.startTime;

            var match = new Match(common.matchParams);

            assert.instanceOf(match.startTime, Date);
        });
    });
});
