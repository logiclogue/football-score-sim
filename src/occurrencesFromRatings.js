const Ratings = require("../src/Ratings");
const OccurrenceCollection = require("../src/OccurrenceCollection");
const goalsFromRatings = require("../src/goalsFromRatings");
const shotsOnTargetNoGoals = require("../src/shotsOnTargetNoGoals");
const shotsOffTarget = require("../src/shotsOffTarget");

// Ratings -> Time -> Seed -> OccurrenceCollection Occurrences
function occurrencesFromRatings(ratings, time, seed) {
    return new OccurrenceCollection(
        ratings.goals(time, seed),
        ratings.shotsOnTargetNoGoals(time, seed),
        ratings.shotsOffTarget(time, seed)
    );
}

// Ratings ~> Time -> Seed -> OccurrenceCollection Occurrences
Ratings.prototype.occurrences = function (time, seed) {
    return occurrencesFromRatings(this, time, seed);
};

module.exports = occurrencesFromRatings;
