var GoalTimes = require('../js/GoalTimes');
var assert = require('chai').assert;


var decimalGoalTimes = [[0.5, 0.6], , [0.2]];
var periodTimes = [10, 5, 10];
var playablePeriods = [true, false, true];
var startTime = Date.now();

var goalTimes = new GoalTimes(decimalGoalTimes, periodTimes, startTime);

describe('GoalTimes', function () {
    describe('#getMinuteTimes', function () {
        it('should convert to minutes correctly', function () {
            var minuteTimes = goalTimes.getMinuteTimes();

            assert.deepEqual(minuteTimes, [[5, 6], , [17]]);
        });
    });
    
    describe('#getMilliTimes', function () {
        it('should convert to milliseconds correctly', function () {
            var milliTimes = goalTimes.getMilliTimes();
            var times = [
                [
                    calculateTime(300000),
                    calculateTime(360000)
                ],
                ,
                [
                    calculateTime(912000)
                ]
            ];

            assert.deepEqual(milliTimes, times);
        });
    });

    describe('#_totalTime', function () {
        it('should total up all the previous in play times', function () {
            var time = goalTimes._totalTime(2);
            
            assert.equal(time, 15);
        });
    });

    describe('#_totalTimeInPlay', function () {
        it('should total up all the previous times that are in play', function () {
            var time = goalTimes._totalTimeInPlay(2);

            assert.equal(time, 10);
        });
    });

    describe('#_totalTimeNonPlay', function () {
        it('should total up all the previous times that are non play', function () {
            var time = goalTimes._totalTimeNonPlay(2);

            assert.equal(time, 5);
        });
    });
});


function calculateTime(time) {
    return time + startTime;
}
