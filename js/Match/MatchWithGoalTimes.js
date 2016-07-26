var Match = require('./Match');
var GoalTimes = require('../GoalTimes');
var random = require('seeded-random');


/*
 * Class which extends Match and adds goal times.
 */
function MatchWithGoalTimes() {
    Match.apply(this, arguments);

    // As a decimal of the period length.
    this.decimalGoalTimes = [[], []];
    this._inPlayPeriodLength = [, 45, , 45, , 15, , 15, , , ];
    // In actual minutes since the match started
    // excluding breaks.
    this.goalTimes = [
        new GoalTimes([], this._inPlayPeriodLength),
        new GoalTimes([], this._inPlayPeriodLength)
    ];
}

MatchWithGoalTimes.prototype = Object.create(Match.prototype);

(function (static_, proto_, super_) {

    /*
     * Overrides the simulate method.
     */
    proto_.simulate = function () {
        super_.simulate.apply(this, arguments);

        var genGoalTimes = this._generateDecimalGoalTimes;

        this._forEachTeam(function (team) {
            var goalTimes = this.goalTimes[team];
            var decGoalTimes = goalTimes.decimalGoalTimes;

            this._forEachPeriod(this.goals[team], function (period, goals) {
                console.log('test', period, goals);

                decGoalTimes[period] = genGoalTimes(period, goals, team);
            }.bind(this));
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
