const Match = require("./Match");

class MatchTimes {
    // Match -> MatchTimes
    constructor(match) {
        this.value = match;
    }
}

// Match ~> MatchTimes
Match.prototype.toMatchTimes = function () {
    return new MatchTimes(this);
};

module.exports = MatchTimes;
