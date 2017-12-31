const _ = require("lodash");

// [Number] -> [Number]
function relativeRatings(ratings) {
    return _(ratings)
        .map(allRatingsButCurrent(ratings))
        .map(_.mean)
        .map(getDifference(ratings))
        .value();
}

// [Number] -> (Number -> Number -> Number)
function getDifference(ratings) {
    return (rating, i) => ratings[i] - rating;
}

// [Number] -> (Number -> Number -> [Number])
function allRatingsButCurrent(ratings) {
    return (rating, i) => _.filter(ratings, (rating, i2) => i !== i2);
}

module.exports = relativeRatings;
