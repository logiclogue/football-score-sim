var MatchWithGoalTimes = require('./MatchWithGoalTimes');


/*
 * Can simulate a match as if it were live. Input
 * typical match details, but simulation will return
 * the match at the current time.
 * Extends MatchWithGoalTimes class.
 */
function MatchLive(teamA, teamB, options) {
    MatchWithGoalTimes.apply(this, arguments);

    this.period = {
        preKickOff: 0,
        firstHalf: 1,
        halfTime: 2,
        secondHalf: 3,
        preExtraTime: 4,
        extraTimeFirstHalf: 5,
        extraTimeHalfTime: 6,
        extraTimeSecondHalf: 7,
        prePenalties: 8,
        penalties: 9,
        fullTime: 10
    };
    this.startTime = new Date(options.startTime);
    this.matchLength = options.matchLength || 90;
    this.currentPeriod = this.period.preKickOff;
    
    // Overrides:
    this.goals;
    this.goalTimes;
}

// Extending MatchWithGoalTimes class.
MatchLive.prototype = Object.create(MatchWithGoalTimes.prototype);

(function (static_, proto_, super_) {

    /*
     * Overrides the simulate method.
     */
    proto_.simulate = function () {
        var returnVal = super_.simulate.call(this);

        return returnVal;
    };


    /*
     * Calculates what period of the game it is.
     */
    proto_._calculatePeriod = function () {
        var currentTime = new Date();

        if (currentTime.getTime() < this.startTime.getTime()) {
            this.currentPeriod = this.period.preKickOff;
        }
    };

}(MatchLive, MatchLive.prototype, MatchWithGoalTimes.prototype));

module.exports = MatchLive;
