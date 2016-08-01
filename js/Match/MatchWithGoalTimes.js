var Match = require('./Match');
var GoalTimes = require('../GoalTimes');
var random = require('seeded-random');


/*
 * Class which extends Match and adds goal times.
 */
function MatchWithGoalTimes() {
    Match.apply(this, arguments);

    this.periodLengths = [, 45, 15, 45, 5, 15, 5, 15, , , ];
    this.minuteGoalTimes = [[], []];
    this.decimalGoalTimes = [[], []];
    this.goalTimes = [
        new GoalTimes([], this.periodLengths),
        new GoalTimes([], this.periodLengths)
    ];
}

MatchWithGoalTimes.prototype = Object.create(Match.prototype);

(function (static_, proto_, super_) {

    /*
     * Overrides the simulate method.
     */
    proto_.simulate = function () {
        super_.simulate.apply(this, arguments);

        this._generateAllGoalTimes();
    };


    /*
     * Generates all the goal times for each team.
     */
    proto_._generateAllGoalTimes = function () {
        var genGoalTimes = this._generateDecimalGoalTimes;

        this._forEachTeam(function (team) {
            var goalTimes = this.goalTimes[team];
            var decGoalTimes = goalTimes.decimalGoalTimes;

            this._forEachPeriod(this.goals[team], function (period, goals) {
                decGoalTimes[period] = genGoalTimes(period, goals, team);
            }.bind(this));

            this.minuteGoalTimes[team] = goalTimes.getMinuteTimes();
            this.decimalGoalTimes[team] = goalTimes.getMilliTimes();
        }.bind(this));
    };

    /*
     * Generate times for each goal, in minutes,
     * relative to the start of the match.
     */
    proto_._generateDecimalGoalTimes = function (period, goalCount, team) {
        var array = [];

        var i;
        var seed;
        var decimal;

        for (i = 0; i < goalCount; i += 1) {
            seed = this.seed;
            seed += ' ' + goalCount;
            seed += ' ' + i;
            seed += ' ' + period;
            seed += ' ' + team;
            decimal = random.decimal(seed);

            array.push(decimal);
        }

        array = array.sort(this._compareFunction);

        return array;
    };

    /*
     * Calls the callback for each period except
     * penalties and full time.
     */
    proto_._forEachPeriod = function (goalPeriods, callback) {
        goalPeriods.forEach(function (goals, period) {
            var isFullTime = period === this.period.FULL_TIME;
            var isPenalties = period === this.period.PENALTIES;

            if (isFullTime || isPenalties) {
                return;
            }

            callback(period, goals);
        }.bind(this));
    };

    /*
     * Function that compares and sorts the goal times.
     */
    proto_._compareFunction = function (a, b) {
        return a > b;
    }
    
}(MatchWithGoalTimes, MatchWithGoalTimes.prototype, Match.prototype));

module.exports = MatchWithGoalTimes;
