class TimeScaler {
    // Date -> Time -> Number -> TimeScaler
    constructor(dateOffset, timeOffset, scale) {
        this.dateOffset = dateOffset || new Date(0);
        this.timeOffset = timeOffset || new Time();
        this.scaleFactor = scale || 1;
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
