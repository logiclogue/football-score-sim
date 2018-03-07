class Match {
    // [Team] -> Seed -> Match
    constructor(teams, seed) {
        this.home = teams[0];
        this.away = teams[1];
        this.seed = seed;
    }
}

module.exports = Match;
