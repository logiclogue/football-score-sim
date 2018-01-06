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

    get relative() {
    
    }
}

// [Number] ~> Ratings
Array.prototype.toRatings = function () {
    return new Ratings(this);
};

module.exports = Ratings;
