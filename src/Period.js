const goalsFromRatings = require("./goalsFromRatings");
const OccurrenceCollection = require("./OccurrenceCollection");
const occurrencesFromRatings = require("./occurrencesFromRatings");

class Period {
    // Time -> Ratings -> Seed -> Period
    constructor(timeLength, ratings, seed) {
        this.timeLength = timeLength;
        this.ratings = ratings;
        this.seed = seed;
    }

    // Period ~> OccurrenceCollection
    get occurrences() {
        return this.ratings.occurrences(this.timeLength, this.seed);
    }
}

module.exports = Period;
