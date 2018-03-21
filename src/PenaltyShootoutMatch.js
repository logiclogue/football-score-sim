const Match = require("./Match");

class PenaltyShootoutMatch extends Match {
    // Match -> PenaltyShootoutMatch
    constructor(match) {
        super(match.teams, match.seed);

        this.match = match;
    }

    // @Override
    // PenaltyShootoutMatch ~> Boolean
    get isPenaltyShootout() {
        if (this.goals.isDraw) {
            return true;
        }

        return false;
    }
}

module.exports = PenaltyShootoutMatch;
