const goalsFromRatings = require("./goalsFromRatings");
const OccurrenceCollection = require("./OccurrenceCollection");

class Period {
    // Time -> Ratings -> Seed -> Period
    constructor(timeLength, ratings, seed) {
        this.timeLength = timeLength;
        this.ratings = ratings;
        this.seed = seed;
    }

    // Period ~> OccurrenceCollection
    get occurrences() {
        return new OccurrenceCollection(
            this.ratings.goals(this.timeLength, this.seed)
        );
    }
}

module.exports = Period;
