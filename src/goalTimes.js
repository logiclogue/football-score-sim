const _ = require("lodash");
const Time = require("./Time");

// [Number] -> Time -> Seed -> [[Time]]
function goalTimes(goals, timeLength, seed) {
    return _(goals)
        //.map(goals =>
        //    _(_.range(goals))
        //        .map(Math.random)
        //        .map(x => x * 90)
        //        .orderBy(x => x)
        //        .map(mins => new Time().setMinutes(mins))
        //        .value())
        .map(goals => _goalTimes(goals, timeLength, seed))
        .value();
}

// Number -> Time -> Seed -> [Time]
function _goalTimes(goals, timeLength, seed) {
    return _(_.range(goals))
        .map(mins => new Time().setMinutes(0))
        .value();
}

module.exports = goalTimes;
