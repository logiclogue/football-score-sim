var GoalTimes = require('../js/GoalTimes');
var assert = require('chai').assert;


var goalTimes = new GoalTimes([0.5, , 0.2], [10, , 10]);

describe('GoalTimes', function () {
    describe('#getMinuteTimes', function () {
        it('should convert to minutes correctly', function () {
            var minuteTimes = goalTimes.getMinuteTimes();

            assert.deepEqual(minuteTimes, [5, , 2]);
        });
    });
    
    describe('#getMilliTimes', function () {
        it('should convert to milliseconds correctly', function () {
            var milliTimes = goalTimes.getMilliTimes();

            assert.deepEqual(milliTimes, [300000, , 120000]);
        });
    });
});
