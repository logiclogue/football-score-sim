const Match = require("../src/Match");
const Period = require("../src/Period");
const Time = require("../src/Time");

class ExtraTimeMatch {
    // Match -> ExtraTimeMatch
    constructor(match) {
        this.match = new Match(match.teams, match.seed);
    }

    // ExtraTimeMatch ~> Seed
    get seed() {
        return this.match.seed;
    }

    // ExtraTimeMatch ~> Team
    get home() {
        return this.match.home;
    }

    // ExtraTimeMatch ~> Team
    get away() {
        return this.match.away;
    }

    // ExtraTimeMatch ~> [Team]
    get teams() {
        return this.match.teams;
    }

    // ExtraTimeMatch ~> Ratings
    get ratings() {
        return this.match.ratings;
    }

    // ExtraTimeMatch ~> Nullable Team
    get winner() {
        return this.occurrences.goals.winner(this.teams);
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

    // ExtraTimeMatch ~> OccurrenceCollection Occurrences
    get occurrences() {
        if (this.isExtraTime) {
            return this.match.occurrences.append(this.extraTimeOccurrences);
        }

        return this.match.occurrences;
    }

    // ExtraTimeMatch ~> Boolean
    get isDraw() {
        return this.occurrences.goals.isDraw;
    }

    // ExtraTimeMatch ~> Boolean
    get isExtraTime() {
        return this.match.occurrences.goals.isDraw;
    }

    // ExtraTimeMatch ~> Boolean
    get isPenaltyShootout() {
        return this.match.isPenaltyShootout;
    }

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
