/*
 * Class which manages the goal times array.
 * Converts into other useful types.
 */
function GoalTimes(goalTimes, periodTimes) {
    this.decimalGoalTimes = goalTimes || [];
    this.periodTimes = periodTimes || [];
}

(function (static_, proto_) {

    /*
     * Returns the goal time array as an array in
     * minutes.
     */
    proto_.getMinuteTimes = function () {
        return this.decimalGoalTimes.map(function (time, index) {
            var periodTime = this.periodTimes[index];

            return this._convertDecimalToMinutes(time, periodTime);
        }.bind(this));
    };

    /*
     * Returns the goal time array as an array in
     * milliseconds.
     */
    proto_.getMilliTimes = function () {
        var minuteTimes = this.getMinuteTimes();

        return minuteTimes.map(this._convertMinutesToMilli);
    };


    /*
     * Converts a decimal time to minutes
     */
    proto_._convertDecimalToMinutes = function (time, periodLength) {
        if (time === undefined)
            return;

        return time * periodLength;
    };

    /*
     * Converts minutes to milliseconds.
     */
    proto_._convertMinutesToMilli = function (time) {
        if (time === undefined)
            return;

        return time * 60 * 1000;
    };

}(GoalTimes, GoalTimes.prototype));

module.exports = GoalTimes;
