const Ratings = require("../src/Ratings");
const Period = require("../src/Period");
const Time = require("../src/Time");

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

    // Match ~> Period
    get firstHalf() {
        const timeLength = new Time().setMinutes(45);
        const seed = this.seed.append("firstHalf");

        return new Period(timeLength, this.ratings, seed);
    }

    // Match ~> Period
    get secondHalf() {
        const timeLength = new Time().setMinutes(45);
        const seed = this.seed.append("secondHalf");

        return new Period(timeLength, this.ratings, seed);
    }

    // Match ~> Boolean
    get isExtraTime() {
        return false;
    }

    // Match ~> Boolean
    get isPenaltyShootout() {
        return false;
    }

    // Match ~> Occurrences
    get goals() {
        return this.firstHalf.goals.append(this.secondHalf.goals);
    }

    // Match ~> Nullable Team
    get winner() {
        return this.goals.winner(this.teams);
    }

    // Match ~> Boolean
    get isDraw() {
        return this.goals.isDraw;
    }
}

module.exports = Match;
