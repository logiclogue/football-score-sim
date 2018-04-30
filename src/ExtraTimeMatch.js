const Match = require("../src/Match");
const Period = require("../src/Period");
const Time = require("../src/Time");

class ExtraTimeMatch {
    // Match -> ExtraTimeMatch
    constructor(match) {
        this.match = new Match(match.teams, match.seed);
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

    // ExtraTimeMatch ~> OccurrenceCollection Occurrences
    get extraTimeOccurrences() {
        return this.firstHalfExtraTime.occurrences
            .append(this.secondHalfExtraTime.occurrences);
    }

    // @Override
    // ExtraTimeMatch ~> OccurrenceCollection Occurrences
    get occurrences() {
        if (this.isExtraTime) {
            return this.match.occurrences.append(this.extraTimeOccurrences);
        }

        return this.match.occurrences;
    }

    // @Override
    // ExtraTimeMatch ~> Boolean
    get isExtraTime() {
        return this.match.occurrences.goals.isDraw;
    }

    // @Override
    // ExtraTimeMatch ~> [Period]
    get periods() {
        const extraTimePeriods = [
            this.firstHalfExtraTime,
            this.secondHalfExtraTime
        ];

        return this.match.periods.concat(extraTimePeriods);
    }
}

// Match ~> ExtraTimeMatch
Match.prototype.toExtraTimeMatch = function () {
    return new ExtraTimeMatch(this);
};

module.exports = ExtraTimeMatch;
