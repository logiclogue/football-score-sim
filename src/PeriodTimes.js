const Period = require("./Period");

class PeriodTimes {
    // Period -> PeriodTimes
    constructor(period) {
        this.period = period;
    }
}

// Period ~> PeriodTimes
Period.prototype.toPeriodTimes = function () {
    return new PeriodTimes(period);
};

module.exports = PeriodTimes;
