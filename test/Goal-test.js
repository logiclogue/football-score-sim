var assert = require('chai').assert;
var sinon = require('sinon');
var Goal = require('../src/Goal');
var Period = require('../src/Period');
var MatchTime = require('../src/MatchTime');

describe('Goal', function () {
    var goal;
    var period;
    var matchTime;

    beforeEach(function () {
        period = sinon.mock(new Period({}));
        matchTime = new MatchTime(45, 3);

        period.calculateMatchTime = period
            .expects("calculateMatchTime")
            .returns(matchTime);

        goal = new Goal({
            period: period
        });
    });

    describe('#matchTime', function () {
        it('should call period calculateMatchTime', function () {
            // arrange
            period.calculateMatchTime.withArgs(goal.date).once();
            
            // act
            goal.matchTime;

            // assert
            period.verify();
        });

        it('should return calculateMatchTime result', function () {
            // act
            var result = goal.matchTime;

            // assert
            assert.equal(result, matchTime);
        });
    });
});
