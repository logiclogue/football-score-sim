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
        PRE_KICK_OFF: 0,
        FIRST_HALF: 1,
        HALF_TIME: 2,
        SECOND_HALF: 3,
        PRE_EXTRA_TIME: 4,
        EXTRA_TIME_FIRST_HALF: 5,
        EXTRA_TIME_HALF_TIME: 6,
        EXTRA_TIME_SECOND_HALF: 7,
        PRE_PENALTIES: 8,
        PENALTIES: 9,
        fullTime: 10
    };
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
        var currentTimeMilli = currentTime.getTime();
        var startTimeMilli = this.startTime.getTime();
        var matchLengthMilli = this.matchLength * 60 * 1000;
        var halfLengthMilli = matchLengthMilli / 2;
        var halfExtraTimeLengthMilli = matchLengthMilli / 6;
        var halfTimeLengthMilli = halfExtraTimeLengthMilli;
        var halfTimeExtraTimeLengthMilli = matchLengthMilli / 18;

        // Pre kick off.
        var testTime = startTimeMilli;

        if (currentTimeMilli < testTime) {
            return this.period.PRE_KICK_OFF;
        }

        // First half.
        testTime += halfLengthMilli;

        if (currentTimeMilli < testTime) {
            return this.period.FIRST_HALF;
        }

        // Half time.
        testTime += halfTimeLengthMilli;

        if (currentTimeMilli < testTime) {
            return this.period.HALF_TIME;
        }

        // Second half.
        testTime += halfLengthMilli;

        if (currentTimeMilli < testTime) {
            return this.period.SECOND_HALF;
        }

        // Pre extra time.
        testTime += halfTimeExtraTimeLengthMilli;

        if (currentTimeMilli < testTime) {
            return this.period.PRE_EXTRA_TIME;
        }

        // First half extra time.
        testTime += halfExtraTimeLengthMilli;

        if (currentTimeMilli < testTime) {
            return this.period.EXTRA_TIME_FIRST_HALF;
        }

        // Half time extra time.
        testTime += halfTimeExtraTimeLengthMilli;

        if (currentTimeMilli < testTime) {
            return this.period.EXTRA_TIME_HALF_TIME;
        }

        // Second half extra time.
        timeTime += halfExtraTimeLengthMilli;

        if (currentTimeMilli < testTime) {
            return this.period.EXTRA_TIME_SECOND_HALF;
        }

        // Full time.
        if (currentTimeMilli > testTime) {
            return this.period.FULL_TIME;
        }
    };

}(MatchLive, MatchLive.prototype, MatchWithGoalTimes.prototype));

module.exports = MatchLive;
