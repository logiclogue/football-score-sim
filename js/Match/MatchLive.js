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

    this._periodTimes = [0, 45, 15, 45, 5, 15, 5, 15, 5, 0, 0];
    
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


    /*
     * Gets the match time in minutes.
     */
    proto_._getTime = function () {
        var currentPeriod = this._getPeriod();
        var currentMatchTimeMilli = Date.now() - this.startTime.getTime();
        var currentMatchTime = currentMatchTimeMilli / (1000 * 60);

        switch (currentPeriod) {
            case this.period.HALF_TIME:
                currentMatchTime = 45;

                break;

            case this.period.SECOND_HALF:
                currentMatchTime - 15;

                break;

            case this.period.PRE_EXTRA_TIME:
                currentMatchTime = 90;

                break;

            case this.period.EXTRA_TIME_FIRST_HALF:
                currentMatchTime - 20;

                break;

            case this.period.EXTRA_TIME_HALF_TIME:
                currentMatchTime = 105;

                break;

            case this.period.EXTRA_TIME_SECOND_HALF:
                currentMatchTime - 25;

                break;
        }
    };

    /*
     * Calculates what period of the game it is.
     */
    proto_._getPeriod = function () {
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
        if (currentTimeMilli >= testTime) {
            return this.period.FULL_TIME;
        }
    };

}(MatchLive, MatchLive.prototype, MatchWithGoalTimes.prototype));

module.exports = MatchLive;
