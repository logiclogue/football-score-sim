var Goal = require('./Goal');
var GoalGenerator = require('./GoalGenerator');
var GoalManager = require('./GoalManager');
var Seed = require('./Seed');
var Time = require('./Time');
var iocConfig = require('./iocConfig');


function Period(options) {
    // Instances
    this.teamA = options.teamA;
    this.teamB = options.teamB;
    this.goalManager = options.goalManager || new GoalManager({
        teamA: this.teamA,
        teamB: this.teamB
    });
    this.previousPeriod = options.previousPeriod || iocConfig.noPeriod;

    // Variables
    this.timeLength = options.timeLength || new Time(2700000);
    this.startDate = options.startDate || new Date();
    this.finishDate = options.finishDate || this.getFinishDate();
    this.seed = options.seed || new Seed();
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
            seed: this.seed.clone().append('A')
        });
        var goalGeneratorB = new GoalGenerator({
            period: this,
            teamScoring: this.teamB,
            teamConceding: this.teamA,
            seed: this.seed.clone().append('B')
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
    proto_.getRelativeTimeFromDate = function (date) {
        this.previousPeriod.getRelativeTimeFromDate(date);
    };

}(Period.prototype));

module.exports = Period;
