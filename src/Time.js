class Time {
    constructor(milliseconds) {
        this.milliseconds = milliseconds || 0;
        this.minusDates = Time.minusDates;
    }

    setMilliseconds(milliseconds) {
        return new Time(milliseconds);
    }

    getMilliseconds() {
        return this.milliseconds;
    }

    setSeconds(seconds) {
        return new Time(seconds * 1000);
    }

    getSeconds() {
        return this.milliseconds / 1000;
    }

    setMinutes(minutes) {
        return new Time(minutes * 60000);
    }

    getMinutes() {
        return this.milliseconds / 60000;
    }

    setHours(hours) {
        return new Time(hours * 3600000);
    }

    getHours() {
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
        var milliA = time.getMilliseconds();
        var milliB = this.getMilliseconds();

        var sum = milliA + milliB;

        return new Time(sum);
    }

    minusTime(time) {
        var milliA = this.getMilliseconds();
        var milliB = time.getMilliseconds();

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

module.exports = Time;
