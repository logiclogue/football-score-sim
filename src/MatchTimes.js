const Match = require("./Match");
const PeriodTimes = require("./PeriodTimes");

class MatchTimes {
    // Match -> MatchTimes
    constructor(match) {
        this.match = match;
    }

    // MatchTimes ~> PeriodTimes
    get firstHalf() {
        return this.match.firstHalf.toPeriodTimes();
    }
}

// Match ~> MatchTimes
Match.prototype.toMatchTimes = function () {
    return new MatchTimes(this);
};

module.exports = MatchTimes;
