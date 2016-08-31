function Period(options) {
    this.options = options;

    if (typeof options.Goal === 'undefined') {
        throw new TypeError('Goal is undefined');
    }

    this.Goal = options.Goal;

    this.length = options.length || 2700000;
    this.startTime = options.startTime || Date.now();
}

module.exports = Period;
