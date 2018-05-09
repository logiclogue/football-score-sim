const OccurrenceCollection = require("./OccurrenceCollection");
const times = require("./times");

// OccurrenceCollection Occurrences -> Time -> Seed
// -> OccurrenceCollection OccurrenceTimes
function occurrenceCollectionToTimes(collection, time, seed) {
    
}

// OccurrenceCollection Occurrences ~> Time -> Seed
// -> OccurrenceCollection OccurrenceTimes
OccurrenceCollection.prototype.toTimes = function (time, seed) {
    return occurrenceCollectionToTimes(this);
};

module.exports = occurrenceCollectionToTimes;
