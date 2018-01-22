const goals = require("./goals");
const shotsOnTarget = require("./shotsOnTarget");

class Period {
    // Time -> Ratings -> Seed -> Period
    constructor(timeLength, ratings, seed) {
        this.timeLength = timeLength;
        this.ratings = ratings;
        this.seed = seed;
    }

    // Period ~> Occurrences
    get goals() {
        return this.ratings.goals(this.timeLength, this.seed);
    }

    // Period ~> Occurrences
    get shotsOnTarget() {
        return this.ratings
            .shotsOnTarget(this.timeLength, this.seed, this.goals);
    }
}

module.exports = Period;
