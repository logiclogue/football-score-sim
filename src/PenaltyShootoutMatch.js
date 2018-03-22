const Match = require("./Match");
const PenaltyShootout = require("./PenaltyShootout");

class PenaltyShootoutMatch extends Match {
    // Match -> PenaltyShootoutMatch
    constructor(match) {
        super(match.teams, match.seed);

        this.match = match;
    }

    // PenaltyShootoutMatch ~> PenaltyShootout
    get penaltyShootout() {
        const seed = this.seed.append("penaltyShootout");

        return new PenaltyShootout().simulate(seed);
    }

    // @Override
    // PenaltyShootoutMatch ~> Boolean
    get isPenaltyShootout() {
        if (this.goals.isDraw) {
            return true;
        }

        return false;
    }

    // @Override
    // PenaltyShootoutMatch ~> Team
    get winner() {
        if (this.goals.isDraw) {
            return this.penaltyShootout.goals.winner(this.teams)
        }

        return this.match.winner;
    }
}

Match.prototype.toPenaltyShootoutMatch = function () {
    return new PenaltyShootoutMatch(this);
};

module.exports = PenaltyShootoutMatch;
