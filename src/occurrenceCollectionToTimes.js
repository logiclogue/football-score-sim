const OccurrenceCollection = require("./OccurrenceCollection");
const times = require("./times");

// OccurrenceCollection Occurrences -> Time -> Seed
// -> OccurrenceCollection OccurrenceTimes
function occurrenceCollectionToTimes(collection, time, seed) {
    return collection.map((o, name) => o.times(time, seed.append(name)));
}

// OccurrenceCollection Occurrences ~> Time -> Seed
// -> OccurrenceCollection OccurrenceTimes
OccurrenceCollection.prototype.toTimes = function (time, seed) {
    return occurrenceCollectionToTimes(this, time, seed);
};

module.exports = occurrenceCollectionToTimes;
