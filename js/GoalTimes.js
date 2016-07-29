/*
 * Class which manages the goal times array.
 * Converts into other useful types.
 */
function GoalTimes(goalTimes, periodTimes, startTimeMilli) {
    this.decimalGoalTimes = goalTimes || [];
    this.periodTimes = periodTimes || [];
    this.startTimeMilli = startTimeMilli || Date.now();
}

(function (static_, proto_) {

    /*
     * Returns the goal time array as an array in
     * minutes.
     */
    proto_.getMinuteTimes = function () {
        var convert = this._convertDecimalToMinutes;

        return this.decimalGoalTimes.map(function (times, index) {
            var periodTime = this.periodTimes[index];

            return times.map(function (time) {
                return convert(time, periodTime);
            }.bind(this));
        }.bind(this));
    };

    /*
     * Returns the goal time array as an array in
     * milliseconds.
     */
    proto_.getMilliTimes = function () {
        var minuteTimes = this.getMinuteTimes();
        var convert = this._convertMinutesToMilli.bind(this);

        return minuteTimes.map(function (times, period) {
            console.log(period);

            return times.map(convert);
        }.bind(this));
    };


    /*
     * Converts a decimal time to minutes
     */
    proto_._convertDecimalToMinutes = function (time, periodLength) {
        if (time === undefined || periodLength === undefined)
            return;

        return time * periodLength;
    };

    /*
     * Converts minutes to milliseconds.
     */
    proto_._convertMinutesToMilli = function (time) {
        if (time === undefined)
            return;
        
        time *= 60000;
        time += this.startTimeMilli;

        return time;
    };

    /*
     * Total of in play time before current period.
     */
    proto_._totalTimeInPlay = function (period) {
        var total = 0;

        this._forEachPreviousInPlayPeriod(period, function (i) {
            total += this.periodTimes[i];
        }.bind(this));

        return total;
    };

    /*
     * Total time in breaks before current period.
     */
    proto_._totalTimeNonPlay = function (period) {
        var total = 0;

        this._forEachPreviousNonPlayPeriod(period, function (i) {
            total += this.periodTimes[i];
        }.bind(this));

        return total;
    };
    
    /*
     * Total time before current period.
     */
    proto_._totalTime = function (period) {
        var total = 0;

        this._forEachPreviousPeriod(period, function (i) {
            total += this.periodTimes[i];
        }.bind(this));

        return total;
    };

    /*
     * For loop, for each previous in play period it
     * calls back.
     */
    proto_._forEachPreviousInPlayPeriod = function (period, callback) {
        for (period -= 1; period >= 0; period -= 1) {
            if (this.decimalGoalTimes[period] !== undefined)
                callback(period);
        }
    };

    /*
     * For loop, for each previous out of play period
     * it calls back.
     */
    proto_._forEachPreviousNonPlayPeriod = function (period, callback) {
        var isPeriodTimeUndefined;
        var isDecimalTimeUndefined;
        var periodTimes = this.periodTimes;
        var decimalTimes = this.decimalGoalTimes;

        for (period -= 1; period >= 0; period -= 1) {
            isPeriodTimeUndefined = periodTimes[period] === undefined;
            isDecimalTimeUndefined = decimalTimes[period] === undefined;

            if (!isPeriodTimeUndefined && isDecimalTimeUndefined)
                callback(period);
        }
    }

    /*
     * For loop which calls back for each previous period.
     */
    proto_._forEachPreviousPeriod = function (period, callback) {
        for (period -= 1; period >= 0; period -= 1) {
            callback(period);
        }
    };

}(GoalTimes, GoalTimes.prototype));

module.exports = GoalTimes;
