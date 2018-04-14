const Period = require("./Period");
const times = require("./times");

class PeriodTimes {
    // Period -> PeriodTimes
    constructor(period) {
        this.period = period;
    }

    // PeriodTimes ~> [[Time]]
    get goals() {
        return times(
            this.period.goals.value,
            this.period.timeLength,
            this.period.seed.append("goals").append("times")
        );
    }

    // PeriodTimes ~> [[Time]]
    get shotsOnTarget() {
        
    }

    // PeriodTimes ~> [[Time]]
    get shotsOffTarget() {
        return times(
            this.period.shotsOffTarget.value,
            this.period.timeLength,
            this.period.seed.append("shotsOffTarget").append("times")
        );
    }

    // PeriodTimes ~> [[Time]]
    get shots() {

    }
}

// Period ~> PeriodTimes
Period.prototype.toPeriodTimes = function (period) {
    return new PeriodTimes(period);
};

module.exports = PeriodTimes;