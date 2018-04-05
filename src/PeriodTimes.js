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
            this.period.seed.append("times")
        );
    }

    // PeriodTimes ~> [[Time]]
    get shotsOnTarget() {
        
    }

    // PeriodTimes ~> [[Time]]
    get shotsOffTarget() {

    }

    // PeriodTimes ~> [[Time]]
    get shots() {

    }
}

// Period ~> PeriodTimes
Period.prototype.toPeriodTimes = function () {
    return new PeriodTimes(period);
};

module.exports = PeriodTimes;
