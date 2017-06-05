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

    describe('#onGoal()', function () {
        it('should call onDate', function (done) {
            var hasCalledDone = false;

            events.timeEvents.onDate = function (callback, goalDate) {
                if (goalDate === date) {
                    done();
                }
            };

            events.onGoal(function () {});
        });

        it('should callback with the goal', function () {
            events.timeEvents.onDate = function (callback, date) {
                callback();
            };

            events.onGoal(function (goal) {
                assert.instanceOf(goal, Goal);
            });
        });

        it('should callback with each goal different', function () {
            var goals = [];

            events.timeEvents.onDate = function (callback, date) {
                callback();
            };

            events.onGoal(function (goal) {
                assert.notInclude(goals, goal);

                goals.push(goal);
            });
        });
    });

    describe('#onKickoff()', function () {
        it('should call onDate', function (done) {
            events.timeEvents.onDate = function (callback, date) {
                if (date === match.startTime) {
                    done();
                }
            };

            events.onKickOff(function () {});
        });
    });

    describe('#onFullTime()', function () {
        it('should call onDate', function (done) {
            events.timeEvents.onDate = function (callback, date) {
                assert.equal(date, match.finishTime);

                callback();
            };

            events.onFullTime(done);
        });
    });
});
