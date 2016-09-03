var Goal = require('./Goal');
var NormalDistribution = require('./NormalDistribution');


/*
 * Generates the number of goals scored by a team in a match.
 */
function GoalGenerator(options) {
    // Classes
    this.Goal = options.Goal || Goal;
    this.NormalDistribution = options.NormalDistribution || NormalDistribution;

    // Instances
    this.period = options.period;
    this.teamScoring = options.teamScoring;
    this.teamConceding = options.teamConceding;
    this.random = options.random;
    this.graph;

    // Variables
    this.seed = options.seed;
    this.ratingDifference = options.ratingDifference;
    this.mean = 1.58;
    this.standardDeviation = 1.23;
    this.constant = 0.00245;

    //
    this._calculateGraph();
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
        var goals = 0;
    };


    /*
     * Returns the rating difference between the two teams.
     */
    proto_._getRatingDifference = function () {
        return this.teamScoring.rating - this.teamConceding.rating;
    };

    /*
     * Calculates the graph.
     */
    proto_._calculateGraph = function () {
        var prodRatingDiffConstant = this.ratingDifference * this.constant;
        var mean = this.mean + prodRatingDiffConstant;

        this.graph = new this.NormalDistribution(mean, this.standardDeviation);
    };

}(GoalGenerator.prototype));

module.exports = GoalGenerator;
