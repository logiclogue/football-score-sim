var MatchWithGoalTimes = require('./MatchWithGoalTimes');
var List = require('../ScheduleList/List');
var Item = require('../ScheduleList/Item');


/*
 * Can simulate a match as if it were live. Input
 * typical match details, but simulation will return
 * the match at the current time.
 * Extends MatchWithGoalTimes class.
 */
function MatchLive(teamA, teamB, options) {
    MatchWithGoalTimes.apply(this, arguments);

    this.startTime = new Date(options.startTime);
    this.matchLength = options.matchLength || 90;
    this.currentPeriod = this.period.PRE_KICK_OFF;

    // Overrides:
    this.goals;
    this.goalTimes;
}

// Extending MatchWithGoalTimes class.
MatchLive.prototype = Object.create(MatchWithGoalTimes.prototype);

(function (static_, proto_, super_) {

    /*
     * Returns the current score.
     */
    proto_._simulateLive = function () {
        
    };

}(MatchLive, MatchLive.prototype, MatchWithGoalTimes.prototype));

module.exports = MatchLive;
