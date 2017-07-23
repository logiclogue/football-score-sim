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

    minusDates: Time.minusDates,

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

        return new Date(newMilliseconds);
    },

    minusFromDate: function (date) {
        var dateMilliseconds = date.getTime();
        var newMilliseconds = dateMilliseconds - this.milliseconds;

        return new Date(newMilliseconds);
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
