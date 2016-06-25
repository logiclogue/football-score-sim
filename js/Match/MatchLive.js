var MatchWithGoalTimes = require('./MatchWithGoalTimes');


/*
 * Can simulate a match as if it were live. Input
 * typical match details, but simulation will return
 * the match at the current time.
 * Extends MatchWithGoalTimes class.
 */
function MatchLive() {
    MatchWithGoalTimes.apply(this, arguments);
}

// Extending.
MatchLive.prototype = Object.create(MatchWithGoalTimes.prototype);

(function (static_, proto_, super_) {

    /*
     * Overrides the simulate method.
     */
    proto_.simulate = function () {
        var returnVal = super_.simulate.call(this);

        return returnVal;
    };

}(MatchLive, MatchLive.prototype, MatchWithGoalTimes.prototype));

module.exports = MatchLive;
