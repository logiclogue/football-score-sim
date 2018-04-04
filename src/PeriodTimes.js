const Period = require("./Period");

class PeriodTimes {
    // Period -> PeriodTimes
    constructor(period) {
        this.period = period;
    }

    // PeriodTimes ~> [[Time]]
    get goals() {
        
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
