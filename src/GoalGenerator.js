function GoalGenerator(options) {
    // Classes
    this.Goal = options.Goal;

    // Instances
    this.period = options.period;
    this.teamScoring = options.teamScoring;
    this.teamConceding = options.teamConceding;

    // Variables
    this.seed = options.seed;
    this.ratingDifference = options.ratingDifference;
}

(function (proto_) {

    proto_.generate = function () {

    };

}(GoalGenerator.prototype));

module.exports = GoalGenerator;
