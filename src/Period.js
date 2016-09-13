var Goal = require('./Goal');
var GoalGenerator = require('./GoalGenerator');
var GoalManager = require('./GoalManager');


function Period(options) {
    // Classes
    this.Goal = options.Goal || Goal;
    this.GoalGenerator = options.GoalGenerator || GoalGenerator;
    this.GoalManager = options.GoalManager || GoalManager;

    // Instances
    this.teamA = options.teamA;
    this.teamB = options.teamB;
    this.goalManager = options.goalManager || new this.GoalManager({
        teamA: this.teamA,
        teamB: this.teamB
    });

    // Variables
    this.length = options.length || 2700000; // or 45 minutes in milliseconds
    this.startTime = options.startTime || Date.now();
    this.seed = options.seed;
}

(function (proto_) {

    /*
     * Simulates the period, populating the goals that have been scored.
     */
    proto_.simulate = function () {
        var goalGeneratorA = new this.GoalGenerator({
            period: this,
            teamScoring: this.teamA,
            teamConceding: this.teamB,
            seed: this.seed + ' A'
        });
        var goalGeneratorB = new this.GoalGenerator({
            period: this,
            teamScoring: this.teamB,
            teamConceding: this.teamA,
            seed: this.seed + ' B'
        });
        var addGoals = this.goalManager.addGoals.bind(this.goalManager);

        addGoals(0, goalGeneratorA.generate());
        addGoals(1, goalGeneratorB.generate());
    };

}(Period.prototype));

module.exports = Period;
