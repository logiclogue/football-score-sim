const goals = require("./goals");
const goalsFromRatings = require("./goalsFromRatings");
const shotsOffTarget = require("./shotsOffTarget");
const OccurrenceCollection = require("./OccurrenceCollection");

class Period {
    // Time -> Ratings -> Seed -> Period
    constructor(timeLength, ratings, seed) {
        this.timeLength = timeLength;
        this.ratings = ratings;
        this.seed = seed;
    }

    // Period ~> OccurrenceCollection
    get occurrenceCollection() {

    }
}

module.exports = Period;
