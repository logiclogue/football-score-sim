const Period = require("./Period");
const times = require("./times");

class PeriodTimes {
    // Period -> PeriodTimes
    constructor(period) {
        this.period = period;
    }

    // PeriodTimes ~> OccurrenceTimes
    get goals() {
        return times(
            this.period.goals.value,
            this.period.timeLength,
            this.period.seed.append("goals").append("times")
        );
    }

    // PeriodTimes ~> OccurrenceTimes
    get shotsOnTarget() {
        
    }

    // PeriodTimes ~> OccurrenceTimes
    get shotsOffTarget() {
        return times(
            this.period.shotsOffTarget.value,
            this.period.timeLength,
            this.period.seed.append("shotsOffTarget").append("times")
        );
    }

    // PeriodTimes ~> OccurrenceTimes
    get shots() {

    }
}

// Period ~> PeriodTimes
Period.prototype.toPeriodTimes = function (period) {
    return new PeriodTimes(period);
};

module.exports = PeriodTimes;
