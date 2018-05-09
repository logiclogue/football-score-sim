const OccurrenceCollection = require("./OccurrenceCollection");
const times = require("./times");

// OccurrenceCollection Occurrences -> Time -> Seed
// -> OccurrenceCollection OccurrenceTimes
function occurrenceCollectionToTimes(collection, time, seed) {
    return collection.map(o => o.times(time, seed));
}

// OccurrenceCollection Occurrences ~> Time -> Seed
// -> OccurrenceCollection OccurrenceTimes
OccurrenceCollection.prototype.toTimes = function (time, seed) {
    return occurrenceCollectionToTimes(this);
};

module.exports = occurrenceCollectionToTimes;
