var Goal = require('./Goal');
var GoalGenerator = require('./GoalGenerator');


function Period(options) {
    // Classes
    this.Goal = options.Goal || Goal;
    this.GoalGenerator = options.GoalGenerator || GoalGenerator;

    // Instances
    this.teamA = options.teamA;
    this.teamB = options.teamB;

    // Variables
    this.length = options.length || 2700000; // or 45 minutes in milliseconds
    this.startTime = options.startTime || Date.now();
    this.seed = options.seed;
}

(function (proto_) {

    proto_.simulate = function () {
        var goalGeneratorA = new this.GoalGenerator({
            Goal: this.Goal,
            period: this,
            teamScoring: this.teamA,
            teamConceding: this.teamB
        });
        var goalGeneratorB = new this.GoalGenerator({
            Goal: this.Goal,
            period: this,
            teamScoring: this.teamB,
            teamConceding: this.teamA
        });
    };

}(Period.prototype));

module.exports = Period;
