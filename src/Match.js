class Match {
    // [Team] -> Seed -> Match
    constructor(teams, seed) {
        this.teams = teams;
        this.seed = seed;
    }

    // Match ~> Team
    get home() {
        return this.teams[0];
    }

    // Match ~> Team
    get away() {
        return this.teams[1];
    }

    // Match ~> Ratings
    get ratings() {
        return this.teams.map(team => team.rating).toRatings();
    }
}

module.exports = Match;
