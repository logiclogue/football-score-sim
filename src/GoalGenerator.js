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
        var rand = this.random.decimal(seed);
        var xValue = this.graph.mean - 10;
        var goals = 0;
        var goalsArray = [];

        while (rand > this.graph.trapeziumRule(xValue, goals + 0.5, 0.1)) {
            goals += 1;

            goalsArray.push(new this.Goal({
                period: this.period,
                team: this.teamScoring
            }));
        }

        return goalsArray;
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
        var ratingDifference = this._getRatingDifference();
        var prodRatingDiffConstant = ratingDifference * this.constant;
        var mean = this.mean + prodRatingDiffConstant;
        var ninetyMinsMs = 5400000; // 90 minutes in milliseconds
        var decimal = this.period.length / ninetyMinsMs;

        this.graph = new this.NormalDistribution(mean, this.standardDeviation);
        this.graph.mean = mean * decimal;
        this.graph.standardDeviation = standardDeviation * decimal;
    };

}(GoalGenerator.prototype));

module.exports = GoalGenerator;
