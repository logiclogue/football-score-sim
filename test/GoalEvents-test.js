var assert = require('chai').assert;
var expect = require('chai').expect;
var GoalEvents = require('../src/GoalEvents');
var GoalManager = require('../src/GoalManager');
var Goal = require('../src/Goal');
var common = require('./common');

describe('GoalEvents', function () {
    var events;
    var goalManager;
    var goals = [
        new Goal({
            date: new Date(1000)
        }),
        new Goal({
            date: new Date(2000)
        })
    ];

    beforeEach(function () {
        goalManager = new GoalManager({
            teamA: common.TeamEngland,
            teamB: common.TeamSlovakia
        })
            .addGoals(0, goals);
        events = new GoalEvents({
            goalManager: goalManager
        });
    });

    describe('#onGoal()', function () {
        it('should call onDate', function () {
            // arrange
            var hasCalled = false;

            events.timeEvents.onDate = function (callback, date) {
                hasCalled = true;
            };

            // act
            events.onGoal(function () {});

            // assert
            assert.isTrue(hasCalled, "Didn't call onDate");
        });

        it('should callback with the goal', function () {
            // arrange
            var hasCalled = false;

            events.timeEvents.onDate = function (callback, date) {
                callback();
            };

            // act
            events.onGoal(function (goal) {
                hasCalled = true;

                // assert
                assert.instanceOf(goal, Goal);
            });

            assert.isTrue(hasCalled);
        });

        it('should callback with each goal different', function () {
            // arrange
            var goals = [];
            var hasCalled = false;

            events.timeEvents.onDate = function (callback, date) {
                callback();

                hasCalled = true;
            };

            // act
            events.onGoal(function (goal) {
                // assert
                expect(goals).to.not.include(goal);

                goals.push(goal);
            });

            assert.isTrue(hasCalled);
        });

        it('should callback with the live score', function () {
            // arrange
            var hasCalled = false;
            var goal;
            var goalManager;

            events.timeEvents.onDate = function (callback, date) {
                if (hasCalled) {
                    return;
                }

                callback();

                hasCalled = true;
            };

            // act
            events.onGoal(function (goalGiven, goalManagerGiven) {
                goal = goalGiven;
                goalManager = goalManagerGiven;
            });

            // assert
            assert.deepEqual(goalManager.getScore(), [1, 0]);
            assert.equal(goalManager.goals[0][0], goals[0]);
            assert.isTrue(hasCalled);
        });
    });
});
