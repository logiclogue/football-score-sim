class TimeScalar {
    // Date -> Number -> TimeScalar
    constructor(date, scale) {
        this.date = date;
        this.scale = scale;
    }

    // TimeScalar ~> Time -> Date
    scale(time) {
        return new Date(time.scale(scale).milliseconds);
    }
}

module.exports = TimeScalar;
