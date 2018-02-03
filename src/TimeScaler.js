class TimeScaler {
    // Date -> Number -> TimeScaler
    constructor(date, scale) {
        this.date = date;
        this.scale = scale;
    }

    // TimeScaler ~> Time -> Date
    scale(time) {
        return new Date(time.scale(scale).milliseconds);
    }
}

module.exports = TimeScaler;
