const Match = require("../Match");

class PenaltyShootoutMatch extends Match {
    // Match -> PenaltyShootoutMatch
    constructor(match) {
        super(match.teams, match.ratings);

        this.match = match;
    }
}

module.exports = PenaltyShootoutMatch;
