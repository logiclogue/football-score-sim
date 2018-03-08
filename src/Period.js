const goals = require("./goals");
const goalsFromRatings = require("./goalsFromRatings");
const shotsOnTarget = require("./shotsOnTarget");
const shotsOffTarget = require("./shotsOffTarget");

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
        const goals = this.goals;

        return this.ratings.shotsOnTarget(this.timeLength, this.seed, goals);
    }

    // Period ~> Occurrences
    get shotsOffTarget() {
        return this.ratings.shotsOffTarget(this.timeLength, this.seed);
    }

    // Period ~> Occurrences
    get shots() {
        return this.shotsOnTarget.append(this.shotsOffTarget);
    }
}

module.exports = Period;
