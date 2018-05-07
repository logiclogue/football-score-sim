const OccurrenceCollection = require("./OccurrenceCollection");
const times = require("./times");

// OccurrenceCollection Occurrences -> OccurrenceCollection OccurrenceTimes
function occurrenceCollectionToTimes(collection) {
    
}

// OccurrenceCollection Occurrences ~> OccurrenceCollection OccurrenceTimes
OccurrenceCollection.prototype.toTimes = function () {
    return occurrenceCollectionToTimes(this);
};

module.exports = occurrenceCollectionToTimes;
