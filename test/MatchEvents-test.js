var assert = require('chai').assert;
var Match = require('../src/Match');
var MatchEvents = require('../src/MatchEvents');
var Goal = require('../src/Goal');
var common = require('./common');

describe('MatchEvents', function () {
    var match = new Match(common.matchParams);
    var date = new Date();

    date.setSeconds(date.getSeconds() + 1);

    var goal = new Goal({
        time: date,
        team: match.teamA
    });

    match.simulate();
    match.goalManager.addGoals(0, [goal]);

    var events = new MatchEvents({
        match: match
    });

    describe('#onGoal', function () {
        it('should wait the correct amount of time', function (done) {
            var hasCalledDone = false;

            events.onGoal(function () {
                if (!hasCalledDone) {
                    done();

                    hasCalledDone = true;
                }
            });
        });
    });
});
