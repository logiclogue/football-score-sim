var Goal = require('./Goal');
var NormalDistribution = require('./NormalDistribution');
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
    this.calculateArea = options.calculateArea || iocConfig.calculateArea();

    // Variables
    this.seed = options.seed;
    this.mean = options.mean || 1.58;
    this.standardDeviation = options.standardDeviation || 1.23;
    this.constant = options.constant || 0.00245;
    this.homeAdvantageEloContant = options.homeAdvantageEloContant || 75;
    this.homeScoring = options.homeScoring || false;
    this.awayScoring = options.awayScoring || false;

    //
    this._calculateGraph();
}

(function (proto_) {

    /*
     * Returns an array with the goals that the team have scored.
     */
    proto_.generate = function () {
        var seed = this.seed
            .append(this.period.startDate.getTime())
            .append(this.teamScoring.name)
            .append(this.teamConceding.name)
            .append(this.period.timeLength.getMilliseconds())
        var length = this.period.timeLength.getMilliseconds();
        var rand = this.random.decimal(seed.getValue());
        var xValue = this.graph.mean - 10;
        var goals = 0;
        var goalsArray = [];
        var f = this.graph.getY.bind(this.graph);

        while (rand > this.calculateArea(f, xValue, goals + 0.5)) {
            goals += 1;

            goalsArray.push(new Goal({
                period: this.period,
                team: this.teamScoring,
                date: this._getGoalDate(seed.append(goals))
            }));
        }

        return goalsArray;
    };


    /*
     * Returns the date the goal was scored, from the given seed, in
     * milliseconds.
     */
    proto_._getGoalDate = function (seed) {
        seed = seed.append('goaltime');

        var startTime = this.period.startDate.getTime();
        var length = this.period.timeLength.getMilliseconds();
        var decimal = this.random.decimal(seed.getValue());
        var time = startTime + (decimal * length);
        var date = new Date(time);

        return date;
    };

    /*
     * Returns the rating difference between the two teams.
     */
    proto_._getRatingDifference = function () {
        var diff = 0;

        if (this.homeScoring) {
            diff = this.homeAdvantageEloContant;
        } else if (this.awayScoring) {
            diff = -this.homeAdvantageEloContant;
        }

        return this.teamScoring.rating - this.teamConceding.rating + diff;
    };

    /*
     * Calculates the graph.
     */
    proto_._calculateGraph = function () {
        var ratingDifference = this._getRatingDifference();
        var prodRatingDiffConstant = ratingDifference * this.constant;
        var mean = this.mean + prodRatingDiffConstant;
        var decimal = this.period.timeLength.getMinutes() / 90;

        var meanScaled = mean * decimal;
        var sdScaled = this.standardDeviation * decimal;

        this.graph = new NormalDistribution(meanScaled, sdScaled);
    };

}(GoalGenerator.prototype));

module.exports = GoalGenerator;
