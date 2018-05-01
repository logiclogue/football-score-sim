const Match = require("./Match");
const PenaltyShootout = require("./PenaltyShootout");

class PenaltyShootoutMatch {
    // Match -> PenaltyShootoutMatch
    constructor(match) {
        this.match = match;
    }

    // PenaltyShootoutMatch ~> Seed
    get seed() {
        return this.match.seed;
    }

    // PenaltyShootoutMatch ~> [Team]
    get teams() {
        return this.match.teams;
    }

    // PenaltyShootoutMatch ~> Team
    get home() {
        return this.match.home;
    }

    // PenaltyShootoutMatch ~> PenaltyShootout
    get penaltyShootout() {
        const seed = this.seed.append("penaltyShootout");

        return new PenaltyShootout().simulate(seed);
    }

    // PenaltyShootoutMatch ~> Occurrences
    get occurrences() {
        return this.match.occurrences;
    }

    // PenaltyShootoutMatch ~> Boolean
    get isPenaltyShootout() {
        if (this.occurrences.goals.isDraw) {
            return true;
        }

        return false;
    }

    // PenaltyShootoutMatch ~> Team
    get winner() {
        if (this.occurrences.goals.isDraw) {
            return this.penaltyShootout.goals.winner(this.teams)
        }

        return this.match.winner;
    }

    // @Override
    // PenaltyShootoutMatch ~> Boolean
    get isDraw() {
        return false;
    }
}

Match.prototype.toPenaltyShootoutMatch = function () {
    return new PenaltyShootoutMatch(this);
};

module.exports = PenaltyShootoutMatch;
