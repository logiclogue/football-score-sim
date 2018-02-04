class TimeScaler {
    // Date -> Time -> Number -> TimeScaler
    constructor(dateOffset, timeOffset, scaleFactor) {
        this.dateOffset = dateOffset || new Date(0);
        this.timeOffset = timeOffset || new Time();
        this.scaleFactor = scaleFactor || 1;
    }

    // TimeScaler ~> Date -> TimeScaler
    setDateOffset(dateOffset) {
        return new TimeScaler(dateOffset, this.timeOffset, this.scaleFactor);
    }

    // TimeScaler ~> Time -> TimeScaler
    setTimeOffset(timeOffset) {
        return new TimeScaler(this.dateOffset, timeOffset, this.scaleFactor);
    }

    // TimeScaler ~> Number -> TimeScaler
    setScaleFactor(scaleFactor) {
        return new TimeScaler(this.dateOffset, this.timeOffset, scaleFactor);
    }

    // TimeScaler ~> Time -> Date
    scale(time) {
        const dateOffsetMilli = this.dateOffset.getTime();
        const timeOffsetMilli = this.timeOffset
            .scale(this.scaleFactor).milliseconds;
        const newMilli = time.scale(this.scaleFactor).milliseconds;

        return new Date(dateOffsetMilli + timeOffsetMilli + newMilli);
    }
}

module.exports = TimeScaler;
