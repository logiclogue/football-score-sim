var Goal = require('./Goal');
var GoalGenerator = require('./GoalGenerator');
var GoalManager = require('./GoalManager');
var Seed = require('./Seed');
var Time = require('./Time');
var MatchTime = require('./MatchTime');
var iocConfig = require('./iocConfig');

function Period(options) {
    // Instances
    this.teamA = options.teamA;
    this.teamB = options.teamB;
    this.goalManager = options.goalManager || new GoalManager({
        teamA: this.teamA,
        teamB: this.teamB
    });
    this.previousPeriod = options.previousPeriod || iocConfig.noPeriod();

    // Variables
    this.timeLength = options.timeLength || new Time(2700000);
    this.startDate = options.startDate || new Date();
    this.finishDate = options.finishDate || this.getFinishDate();
    this.seed = options.seed || new Seed();
    this.homeAdvantage = options.homeAdvantage || false;
}

(function (proto_) {

    /*
     * Simulates the period, populating the goals that have been scored.
     */
    proto_.simulate = function () {
        var goalGeneratorA = new GoalGenerator({
            period: this,
            teamScoring: this.teamA,
            teamConceding: this.teamB,
            seed: this.seed.append('A'),
            homeScoring: this.homeAdvantage
        });
        var goalGeneratorB = new GoalGenerator({
            period: this,
            teamScoring: this.teamB,
            teamConceding: this.teamA,
            seed: this.seed.append('B'),
            awayScoring: this.homeAdvantage
        });
        var addGoals = this.goalManager.addGoals.bind(this.goalManager);

        addGoals(0, goalGeneratorA.generate());
        addGoals(1, goalGeneratorB.generate());
    };

    /*
     * Returns the finish date.
     */
    proto_.getFinishDate = function () {
        return this.timeLength.addToDate(this.startDate);
    };

    /*
     * Return the amound of injury time with a Time object.
     */
    proto_.getInjuryTime = function () {
        return this.timeLength
            .minusDates(this.finishDate, this.startDate)
            .minusTime(this.timeLength);
    };

    /*
     * Returns the relative time, to this period, from the date.
     */
    proto_.calculateMatchTime = function (date) {
        var previousMatchTime = this.previousPeriod
            .calculateMatchTime(date);
        var previousTime = previousMatchTime.getNormalTime();

        var goalTime = this.timeLength.minusDates(date, this.startDate);
        var injuryTime = goalTime.minusTime(this.timeLength);
        var goalTimeMilli = goalTime.getMilliseconds();
        var timeLengthMilli = this.timeLength.getMilliseconds();
        var timeLengthSum = this.timeLength.addTime(previousTime);

        if (goalTimeMilli > timeLengthMilli) {
            return new MatchTime(timeLengthSum, injuryTime);
        }

        return new MatchTime(goalTime.addTime(previousTime), 0);
    };

}(Period.prototype));

module.exports = Period;
