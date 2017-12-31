const _ = require("lodash");

// [Number] -> [Number]
function relativeRatings(ratings) {
    return _(ratings)
        .map((rating, i) => _.filter(ratings, (rating, i2) => i !== i2))
        .map(ratings => _.mean(ratings))
        .map((rating, i) => ratings[i] - rating)
        .value();
}

module.exports = relativeRatings;
