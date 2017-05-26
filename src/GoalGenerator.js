var Goal = require('./Goal');
var NormalDistribution = require('./NormalDistribution');
var random = require('seeded-random');


/*
 * Generates the number of goals scored by a team in a match.
 */
function GoalGenerator(options) {
    // Instances
    this.period = options.period;
    this.teamScoring = options.teamScoring;
    this.teamConceding = options.teamConceding;
    this.random = options.random || random;
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
            this.period.startTime.getTime() + ' ' +
            this.teamScoring.name + ' ' +
            this.teamConceding.name + ' ' +
            this.period.length;
        var length = this.period.length;
        var rand = this.random.decimal(seed);
        var xValue = this.graph.mean - 10;
        var goals = 0;
        var goalsArray = [];

        while (rand > this.graph.trapeziumRule(xValue, goals + 0.5, 0.1)) {
            goals += 1;

            goalsArray.push(new Goal({
                period: this.period,
                team: this.teamScoring,
                time: this._getGoalTime(seed)
            }));
        }

        return goalsArray;
    };


    /*
     * Returns the time the goal was scored, from the given seed, in
     * milliseconds.
     */
    proto_._getGoalTime = function (seed) {
        seed += ' goaltime';

        var startTime = this.period.startTime.getTime();
        var length = this.period.length;
        var decimal = this.random.decimal(seed);
        var time = startTime + (decimal * length);
        var date = new Date(time);

        return date;
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

        this.graph = new NormalDistribution(mean, this.standardDeviation);
        this.graph.mean = mean * decimal;
        this.graph.standardDeviation = this.standardDeviation * decimal;
    };

}(GoalGenerator.prototype));

module.exports = GoalGenerator;
