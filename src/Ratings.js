// [Number] -> Ratings
function Ratings(ratings) {
    this.value = ratings;
}

Array.prototype.toRatings = function () {
    return new Ratings(this);
};

module.exports = Ratings;
