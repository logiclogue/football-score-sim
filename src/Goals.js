const _ = require("lodash");

class Goals {
    // [Number] -> Goals
    constructor(value) {
        this.value = value;
    }

    // Goals ~> Number
    get home() {
        return this.value[0];
    }

    // Goals ~> Number
    get away() {
        return this.value[1];
    }
}

// Array ~> Goals
Array.prototype.toGoals = function () {
    return new Goals(this);
};

// _ ~> Goals
_.prototype.toGoals = function () {
    return new Goals(this.value());
};

module.exports = Goals;
