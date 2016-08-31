function Period(options) {
    this.options = options;
    this.options.period = this;

this.period = options.period;
    if (typeof options.Goal === 'undefined') {
        throw new TypeError('Goal is undefined');
    }

    this.Goal = options.Goal;
    this.TeamGoals = options.TeamGoals;

    this.length = options.length || 2700000;
    this.startTime = options.startTime || Date.now();
    this.goals = [
        new options.TeamGoals(options),
        new options.TeamGoals(options)
    ];
}

module.exports = Period;
