class TimeScaler {
    // Date -> Number -> TimeScaler
    constructor(date, scale) {
        this.date = date;
        this.scaleFactor = scale;
    }

    // TimeScaler ~> Time -> Date
    scale(time) {
        const offsetMilli = this.date.getTime();
        const newMilli = time.scale(this.scaleFactor).milliseconds;

        return new Date(offsetMilli + newMilli);
    }
}

module.exports = TimeScaler;
