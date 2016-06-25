var Match = require('./Match');
var random = require('seeded-random');


/*
 * Class which extends Match and adds goal times.
 */
function MatchWithGoalTimes() {
    Match.apply(this, arguments);

    this.goalTimes = [[], []];
}

MatchWithGoalTimes.prototype = Object.create(Match.prototype);

(function (static_, proto_, super_) {

    /*
     * Overrides the simulate method.
     */
    proto_.simulate = function () {
        var returnVal = super_.simulate.call(this);

        this._generateGoalTimes(0, 90, this.goalsFullTime);

        if (this.goalsExtraTime[0] !== undefined) {
            this._generateGoalTimes(90, 120, this.goalsExtraTime);
        }

        this.goalTimes[0] = this.goalTimes[0].sort(this._compareFunction);
        this.goalTimes[1] = this.goalTimes[1].sort(this._compareFunction);

        return returnVal;
    };


    /*
     * Generates the times the goals were scored.
     */
    proto_._generateGoalTimes = function (startTime, endTime, goalArray) {
        var time = endTime - startTime;

        goalArray.forEach(function (goals, index) {
            var seed = this.seed + ' ' + goals + ' ' + index + ' ' + startTime + ' ' + endTime;

            for (var i = 0; i < goals; i += 1) {
                this.goalTimes[index].push((random.decimal(seed + ' ' + i) * time) + startTime);
            }
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
