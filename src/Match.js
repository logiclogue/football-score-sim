const Ratings = require("./Ratings");
const Period = require("./Period");
const Time = require("./Time");

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

    // Match ~> Nullable Team
    get winner() {
        return this.occurrences.goals.winner(this.teams);
    }

    // Match ~> Boolean
    get isDraw() {
        return this.occurrences.goals.isDraw;
    }

    // Match ~> [Period]
    get periods() {
        return [this.firstHalf, this.secondHalf];
    }

    // Match ~> OccurrenceCollection Occurrences
    get occurrences() {
        return this.firstHalf.occurrences.append(this.secondHalf.occurrences);
    }
}

module.exports = Match;
