const _ = require("lodash");

class Goals {
    // [Number] -> Goals
    constructor(value) {
        this.value = value;
    }

    get home() {
        return this.value[0];
    }

    get away() {
        return this.value[1];
    }
}

Array.prototype.toGoals = function () {
    return new Goals(this);
};

_.prototype.toGoals = function () {
    return new Goals(this.value());
};

module.exports = Goals;
