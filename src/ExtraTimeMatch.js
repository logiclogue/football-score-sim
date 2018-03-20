const Match = require("../src/Match");
const Period = require("../src/Period");
const Time = require("../src/Time");

class ExtraTimeMatch extends Match {
    // Match -> ExtraTimeMatch
    constructor(matchToDecorate) {
        super(matchToDecorate.teams, matchToDecorate.seed);

        this.match = matchToDecorate;
    }

    // ExtraTimeMatch ~> Period
    get firstHalfExtraTime() {
        const timeLength = new Time().setMinutes(15);
        const seed = this.seed.append("firstHalfExtraTime");

        return new Period(timeLength, this.ratings, seed);
    }

    // ExtraTimeMatch ~> Period
    get secondHalfExtraTime() {
        const timeLength = new Time().setMinutes(15);
        const seed = this.seed.append("secondHalfExtraTime");

        return new Period(timeLength, this.ratings, seed);
    }

    // ExtraTimeMatch ~> Goals
    get extraTimeGoals() {
        return this.firstHalfExtraTime.goals
            .append(this.secondHalfExtraTime.goals);
    }

    // @Override
    // ExtraTimeMatch ~> Goals
    get goals() {
        if (this.isExtraTime) {
            return this.match.goals.append(this.extraTimeGoals);
        }

        return this.match.goals;
    }

    // @Override
    // ExtraTimeMatch ~> Boolean
    get isExtraTime() {
        return this.match.goals.isDraw;
    }
}

// Match ~> ExtraTimeMatch
Match.prototype.toExtraTimeMatch = function () {
    return new ExtraTimeMatch(this);
};

module.exports = ExtraTimeMatch;
