const OccurrenceCollection = require("./OccurrenceCollection");
const times = require("./times");

// OccurrenceCollection Occurrences -> Time -> Seed
// -> OccurrenceCollection OccurrenceTimes
function occurrenceCollectionToTimes(collection, time, seed) {
    const newSeed = seed.append("goals");

    return collection.map(o => o.times(time, newSeed));
}

// OccurrenceCollection Occurrences ~> Time -> Seed
// -> OccurrenceCollection OccurrenceTimes
OccurrenceCollection.prototype.toTimes = function (time, seed) {
    return occurrenceCollectionToTimes(this, time, seed);
};

module.exports = occurrenceCollectionToTimes;
