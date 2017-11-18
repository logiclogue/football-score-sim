function Goal(options) {
    this.date = options.date;
    this.team = options.team;
    this.period = options.period;
}

Goal.prototype = {

    get matchTime() {
        if (!this.period) {
            return null;
        }

        return this.period.calculateMatchTime(this.date);
    }

};

module.exports = Goal;
