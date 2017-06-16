var assert = require('chai').assert;
var Match = require('../src/PenaltyShootoutEvents');
var PenaltyShootout = require('../src/PenaltyShootout');
var PenaltyShootoutEvents = require('../src/PenaltyShootoutEvents');
var common = require('./common');

describe('PenaltyShootoutEvents', function () {
    var penaltyShootout = new PenaltyShootout(common.penaltyShootoutParams);
    var events = new PenaltyShootoutEvents({
        penaltyShootout: penaltyShootout
    });

    describe('#onGoal()', function () {
        it('should call onDate correct number of times', function (done) {
            var hasCalledDone = false;
            var i = 0;

            events.timeEvents.onDate = function (callback, date) {
                i += 1;
            };

            console.log(i);
        });
    });
});
