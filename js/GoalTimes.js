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
        //var convert = this._convertDecimalToMinutes;
        var convert = this._getMinuteTime.bind(this);

        return this.decimalGoalTimes.map(function (times, index) {
            var periodTime = this.periodTimes[index];

            return times.map(function (time) {
                return convert(time, periodTime, index);
            }.bind(this));
        }.bind(this));
    };

    /*
     * Returns the goal time array as an array in
     * milliseconds.
     */
    proto_.getMilliTimes = function () {
        var convertMins = this._convert
        var convert = this._getMilliTime.bind(this);

        return this.decimalGoalTimes.map(function (times, period) {
            var periodTime = this.periodTimes[period];

            return times.map(function (time) {
                return convert(time, periodTime, period);
            });
        }.bind(this));
    };


    proto_._getMinuteTime = function (time, periodTime, period) {
        var convert = this._convertDecimalToMinutes;

        time = convert(time, periodTime);
        time += this._totalTimeInPlay(period);

        return time;
    }

    /*
     * Gets the time in milliseconds of the given
     * time and period.
     */
    proto_._getMilliTime = function (time, periodTime, period) {
        var convertDecimal = this._convertDecimalToMinutes;
        var convertMins = this._convertMinutesToMilli;
        var totalTime = this._totalTime(period);

        time = convertDecimal(time, periodTime);
        time = convertMins(time);
        time += convertMins(totalTime);
        time += this.startTimeMilli;

        return time;
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

        return time;
    };

    /*
     * Total time before current period.
     */
    proto_._totalTime = function (period) {
        var method = this._forEachPreviousPeriod;

        return this._totalPrevious.call(this, period, method);
    };

    /*
     * Total of in play time before current period.
     */
    proto_._totalTimeInPlay = function (period) {
        var method = this._forEachPreviousInPlayPeriod;

        return this._totalPrevious.call(this, period, method);
    };

    /*
     * Total time in breaks before current period.
     */
    proto_._totalTimeNonPlay = function (period) {
        var method = this._forEachPreviousNonPlayPeriod;

        return this._totalPrevious.call(this, period, method);
    };

    proto_._totalPrevious = function (period, method) {
        var total = 0;

        method = method.bind(this);

        method(period, function (i) {
            total += this.periodTimes[i];
        }.bind(this));

        return total;
    };

    /*
     * For loop which calls back for each previous period.
     */
    proto_._forEachPreviousPeriod = function (period, callback) {
        for (period -= 1; period >= 0; period -= 1) {
            if (this.periodTimes[period] !== undefined)
                callback(period);
        }
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

}(GoalTimes, GoalTimes.prototype));

module.exports = GoalTimes;
