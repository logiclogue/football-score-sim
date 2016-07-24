var Match = require('./Match');
var random = require('seeded-random');


/*
 * Class which extends Match and adds goal times.
 */
function MatchWithGoalTimes() {
    Match.apply(this, arguments);

    // As a decimal of the period length.
    this.decimalGoalTimes = [[], []];
    // In actual minutes since the match started excluding breaks.
    this.goalTimes = [[], []];
    this._inPlayPeriodLength = [, 45, , 45, , 15, , 15, , , ];
}

MatchWithGoalTimes.prototype = Object.create(Match.prototype);

(function (static_, proto_, super_) {

    /*
     * Overrides the simulate method.
     */
    proto_.simulate = function () {
        var returnVal = super_.simulate.apply(this, arguments);

        var startTime;
        var team;

        var goalTimes;
        var decimalGoalTimes;

        for (team = 0; team < 2; team += 1) {
            startTime = 0;
            goalTimes = this.goalTimes[team];
            decimalGoalTimes = this.decimalGoalTimes[team];

            this._inPlayPeriodLength.forEach(function (periodLength, index) {
                var endTime = startTime + periodLength;
                var goals = this.goals[team][index];

                var decimalGoalTimesPeriod = this._generateDecimalGoalTimes(startTime, endTime, goals, team);
                var goalTimesPeriod = this._generateGoalTimes(startTime, endTime, decimalGoalTimesPeriod);

                goalTimes[index] = goalTimesPeriod;
                decimalGoalTimes[index] = decimalGoalTimesPeriod;

                startTime = endTime;
            }.bind(this));
        }

        return returnVal;
    };

    /*
     * Generate times for each goal, in minutes,
     * relative to the start of the match.
     */
    proto_._generateDecimalGoalTimes = function (startTime, endTime, goalCount, team) {
        var periodLength = endTime - startTime;
        var array = [];

        var i;

        for (i = 0; i < goalCount; i += 1) {
            var seed = this.seed + ' ' + goalCount + ' ' + i + ' ' + startTime + ' ' + endTime + ' ' + team;
            var decimal = random.decimal(seed + ' ' + i);

            array.push(decimal);
        }

        array = array.sort(this._compareFunction);

        return array;
    };

    /*
     * Generates the times the goals were scored.
     */
    proto_._generateGoalTimes = function (startTime, endTime, decimalGoalTimes) {
        var periodLength = endTime - startTime;
        var array = [];

        var i;

        decimalGoalTimes.forEach(function (decimal) {
            var time = (decimal * periodLength) + startTime;

            array.push(time);
        });

        array = array.sort(this._compareFunction);

        return array;
    };

    /*
     * Function that compares and sorts the goal times.
     */
    proto_._compareFunction = function (a, b) {
        return a > b;
    }
    
}(MatchWithGoalTimes, MatchWithGoalTimes.prototype, Match.prototype));

module.exports = MatchWithGoalTimes;
