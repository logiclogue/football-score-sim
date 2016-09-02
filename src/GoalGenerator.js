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
    this.random = options.random;

    // Variables
    this.seed = options.seed;
    this.ratingDifference = options.ratingDifference;
}

(function (proto_) {

    /*
     * Returns an array with the goals that the team have scored.
     */
    proto_.generate = function () {
        var seed = this.seed + ' ' +
            this.team + ' ' +
            this.seed.startTime + ' ' +
            this.seed.length;
        var length = this.period.length;
        var ratingDifference = this._getRatingDifference();
        var rand = this.random.decimal(seed);
    };


    /*
     * Returns the rating difference between the two teams.
     */
    proto_._getRatingDifference = function () {
        return this.teamScoring.rating - this.teamConceding.rating;
    };

}(GoalGenerator.prototype));

module.exports = GoalGenerator;
