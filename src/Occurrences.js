const _ = require("lodash");

class Occurrences {
    // [Number] -> Occurrences
    constructor(value) {
        this.value = value;
    }

    // Occurrences ~> Number
    get home() {
        return this.value[0];
    }

    // Occurrences ~> Number
    get away() {
        return this.value[1];
    }

    // Occurrences ~> Occurrences -> Occurrences
    append(occurrences) {
        return _(this.value)
            .zip(occurrences.value)
            .map(_.sum)
            .toOccurrences();
    }

    // Occurrences ~> [a] -> Either a null
    winner(xs) {
        return _(xs)
            .zip(this.value)
            .maxBy(o => o[1])[0];
    }
}

// Array ~> Occurrences
Array.prototype.toOccurrences = function () {
    return new Occurrences(this);
};

// _ ~> Occurrences
_.prototype.toOccurrences = function () {
    return new Occurrences(this.value());
};

module.exports = Occurrences;
