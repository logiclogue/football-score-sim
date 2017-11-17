function PeriodGenerator(options) {
    this.teamA = options.teamA;
    this.teamB = options.teamB;
    this.seed = options.seed;
    this.homeAdvantage = options.homeAdvantage;
    this.previousPeriod = options.previousPeriod;
    this.timeLength = options.timeLength;
    this.startDate = options.startDate;
    this.finishDate = options.finishDate;
}

PeriodGenerator.prototype = {

    get generate() {
        return null;
    }
    
};

module.exports = PeriodGenerator;
