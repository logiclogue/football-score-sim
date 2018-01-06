const _ = require("lodash");

class Ratings {
    // [Number] -> Ratings
    constructor(ratings) {
        this.value = ratings;
    }

    get home() {
        return this.value[0];
    }

    get away() {
        return this.value[1];
    }

    get _() {
        return _(this.value);
    }

    get relative() {
        return this._
            .map(allRatingsButCurrent(this.value))
            .map(_.mean)
            .map(getDifference(this.value))
            .value();
    }
}

// [Number] -> (Number -> Number -> Number)
function getDifference(ratings) {
    return (rating, i) => ratings[i] - rating;
}

// [Number] -> (Number -> Number -> [Number])
function allRatingsButCurrent(ratings) {
    return (rating, i) => _.filter(ratings, (rating, i2) => i !== i2);
}

// [Number] ~> Ratings
Array.prototype.toRatings = function () {
    return new Ratings(this);
};

module.exports = Ratings;
