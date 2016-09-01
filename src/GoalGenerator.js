/*
 * Generates the number of goals scored by a team in a match.
 */
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

    /*
     * Returns the number of goals that that team will score.
     */
    proto_.generate = function () {

    };

}(GoalGenerator.prototype));

module.exports = GoalGenerator;
