var Goal = require('./Goal');
var NormalDistribution = require('./NormalDistribution');
var TrapeziumRule = require('./TrapeziumRule');
var iocConfig = require('./iocConfig');
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
    this.calculateArea = iocConfig.calculateArea || options.calculateArea;

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
        var seed = this.seed.clone()
            .append(this.period.startDate.getTime())
            .append(this.teamScoring.name)
            .append(this.teamConceding.name)
            .append(this.period.length)
        var length = this.period.length;
        var rand = this.random.decimal(seed.getValue());
        var xValue = this.graph.mean - 10;
        var goals = 0;
        var goalsArray = [];

        while (rand > this.calculateArea(this.graph.getY, xValue, goals + 0.5)) {
            goals += 1;

            goalsArray.push(new Goal({
                period: this.period,
                team: this.teamScoring,
                date: this._getGoalDate(seed.clone().append(goals))
            }));
        }

        return goalsArray;
    };


    /*
     * Returns the date the goal was scored, from the given seed, in
     * milliseconds.
     */
    proto_._getGoalDate = function (seed) {
        seed.append('goaltime');

        var startTime = this.period.startDate.getTime();
        var length = this.period.length;
        var decimal = this.random.decimal(seed.getValue());
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
