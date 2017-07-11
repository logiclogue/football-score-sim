function Time(milliseconds) {
    this.milliseconds = milliseconds;
}

Time.minusDates = function (dateA, dateB) {
    var dateAMilliseconds = dateA.getTime();
    var dateBMilliseconds = dateB.getTime();
    var milliDelta = dateAMilliseconds - dateBMilliseconds;

    return new Time(milliDelta);
};

Time.prototype = {
    getMilliseconds: function () {
        return this.milliseconds;
    },
    getSeconds: function () {
        return this.milliseconds / 1000;
    },
    getMinutes: function () {
        return this.milliseconds / 60000;
    },
    getHours: function () {
        return this.milliseconds / 3600000;
    },
    addToDate: function (date) {
        var dateMilliseconds = date.getTime();
        var newMilliseconds = dateMilliseconds + this.milliseconds;

        var date = new Date(newMilliseconds);

        return date;
    },
    minusFromDate: function (date) {

    },
    addTime: function (time) {
        var milliA = time.getMilliseconds();
        var milliB = this.getMilliseconds();

        var sum = milliA + milliB;

        return new Time(sum);
    },
    minusTime: function (time) {
        var milliA = this.getMilliseconds();
        var milliB = time.getMilliseconds();

        var sum = milliA - milliB;

        return new Time(sum);
    }
};

module.exports = Time;
