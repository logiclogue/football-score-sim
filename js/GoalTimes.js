/*
 * Class which manages the goal times array.
 * Converts into other useful types.
 */
function GoalTimes(goalTimes, periodTimes, playablePeriods, startTimeMilli) {
    this.decimalGoalTimes = goalTimes || [];
    this.periodTimes = periodTimes || [];
    this.playablePeriods = playablePeriods || [];
    this.startTimeMilli = startTimeMilli || Date.now();
}

(function (static_, proto_) {

    /*
     * Returns the goal time array as an array in
     * minutes.
     */
    proto_.getMinuteTimes = function () {
        return this.decimalGoalTimes.map(function (times, index) {
            var periodTime = this.periodTimes[index];

            return times.map(function (time) {
                return this._convertDecimalToMinutes(time, periodTime);
            }.bind(this));
        }.bind(this));
    };

    /*
     * Returns the goal time array as an array in
     * milliseconds.
     */
    proto_.getMilliTimes = function () {
        var minuteTimes = this.getMinuteTimes();

        return minuteTimes.map(function (times) {
            return times.map(this._convertMinutesToMilli);
        }.bind(this));
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
