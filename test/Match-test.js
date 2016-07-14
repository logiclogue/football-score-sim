var assert = require('chai').assert;
var Match = require('../js/Match/MatchWithGoalTimes');
var Team = require('../js/Team');


var england = new Team('England', 1947);
var russia = new Team('Russia', 1736);
var wales = new Team('Wales', 1629);
var slovakia = new Team('Slovakia', 1742);
var derby = new Team('Derby County', 1544);
var united = new Team('Manchester United', 1794);
var matchNormalTime = new Match(england, russia, {
    extraTime: false,
    penalties: true,
    seed: 'test'
});
var matchExtraTime = new Match(england, russia, {
    extraTime: true,
    penalties: false,
    seed: 'testing-extra-time'
});
var matchPenalties = new Match(england, russia, {
    extraTime: true,
    penalties: true,
    seed: 'testing-penalties2'
});

function checkTotalGoals(match) {
    var totalGoals = [0, 0];
    var i;

    for (i = 0; i < 2; i += 1) {
        match.goals[i].forEach(function (goals, index) {
            if (index === match.period.FULL_TIME)
                return;

            totalGoals[i] += goals;
        });
    }

    assert.equal(totalGoals[0], match.goals[0][match.period.FULL_TIME]);
    assert.equal(totalGoals[1], match.goals[1][match.period.FULL_TIME]);
}

describe('Match', function () {
    describe('90 minute match', function () {
        var match = matchNormalTime;
        
        describe('#simulate()', function () {
            match.simulate();

            it('should have correct match text', function () {
                assert.equal(match.text, 'England 2-1 Russia');
            });

            it('should have correct result', function () {
                assert.equal(match.result, 0);
            });

            it('should have correct winner', function () {
                assert.equal(match.winner, england);
            });

            it('should total up correct number of goals', checkTotalGoals.bind(this, match));
        });
    });

    describe('Extra time and draw match', function () {
        var match = matchExtraTime;

        describe('#simulate()', function () {
            match.simulate();

            it('should have correct match text', function () {
                assert.equal(match.text, 'England 1-1 Russia (aet)');
            });

            it('should not have a winner', function () {
                assert.equal(match.winner, undefined);
            });

            it('should have a result of 0.5', function () {
                assert.equal(match.result, 0.5);
            });

            it('should have goals, not undefined for extra time goals', function () {
                assert.equal(match.goals[0][match.period.EXTRA_TIME_FIRST_HALF], 0);
                assert.equal(match.goals[0][match.period.EXTRA_TIME_SECOND_HALF], 0);
                assert.equal(match.goals[1][match.period.EXTRA_TIME_FIRST_HALF], 0);
                assert.equal(match.goals[1][match.period.EXTRA_TIME_SECOND_HALF], 0);
            });

            it('should total up correct number of goals', checkTotalGoals.bind(this, match));
        });
    });

    describe('Extra time and penalties match', function () {
        var match = matchPenalties;

        describe('#simulate()', function () {
            match.simulate();

            it('should have correct match text', function () {
                assert.equal(match.text, 'England 1-1 Russia (aet) (4-3)');
            });

            it('should have correct result', function () {
                assert.equal(match.result, 0);
            });

            it('should have correct winner', function () {
                assert.equal(match.winner, england);
            });

            it('should total up correct number of penalty goals', function () {
                var total = [0, 0];
                var i;

                for (i = 0; i < 2; i += 1) {
                    match.penalties.goalOrder[i].forEach(function (goal) {
                        if (goal)
                            total[i] += 1;
                    });

                    assert.equal(match.penalties.goals[i], total[i]);
                }
            });
        });
    });
});

describe('MatchWithGoalTimes', function () {
    var match = matchNormalTime;

    describe('#simulate()', function () {
        match.simulate();

        it('should have correct number of goals with goal times', function () {
            for (var i = 0; i < 2; i += 1) {
                match.goals[i].forEach(function (goals, index) {
                    if (index === match.period.FULL_TIME || index === match.period.PENALTIES)
                        return;

                    assert.equal(match.goalTimes[i][index].length, goals);
                });
            }
        });
    });
});
