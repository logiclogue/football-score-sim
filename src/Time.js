class Time {
    constructor(milliseconds) {
        this.milliseconds = milliseconds || 0;
        this.minusDates = Time.minusDates;
    }

    setMilliseconds(milliseconds) {
        return new Time(milliseconds);
    }

    setSeconds(seconds) {
        return new Time(seconds * 1000);
    }

    get seconds() {
        return this.milliseconds / 1000;
    }

    setMinutes(minutes) {
        return new Time(minutes * 60000);
    }

    get minutes() {
        return this.milliseconds / 60000;
    }

    setHours(hours) {
        return new Time(hours * 3600000);
    }

    get hours() {
        return this.milliseconds / 3600000;
    }

    addToDate(date) {
        var dateMilliseconds = date.getTime();
        var newMilliseconds = dateMilliseconds + this.milliseconds;

        return new Date(newMilliseconds);
    }

    minusFromDate(date) {
        var dateMilliseconds = date.getTime();
        var newMilliseconds = dateMilliseconds - this.milliseconds;

        return new Date(newMilliseconds);
    }

    addTime(time) {
        var milliA = time.milliseconds;
        var milliB = this.milliseconds;

        var sum = milliA + milliB;

        return new Time(sum);
    }

    minusTime(time) {
        var milliA = this.milliseconds;
        var milliB = time.milliseconds;

        var sum = milliA - milliB;

        return new Time(sum);
    }
}

Time.minusDates = function (dateA, dateB) {
    var dateAMilliseconds = dateA.getTime();
    var dateBMilliseconds = dateB.getTime();
    var milliDelta = dateAMilliseconds - dateBMilliseconds;

    return new Time(milliDelta);
};

Date.prototype.toTime = function () {
    return new Time(this.getTime());
};

module.exports = Time;
