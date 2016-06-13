var NormalDistribution = require('./NormalDistribution');


/*
 * Class which generates a football match score.
 */
function Match(teamA, teamB, options) {
    options = options || {};

    this.team = [teamA, teamB];
    this.ratingDifference = teamA.rating - teamB.rating;

    this.mean = 1.58;
    this.sd = 1.23;
    this.constant = 0.0025;
    this.extraTime = options.extraTime || false;
    this.penaltiesSet = options.penalties || false;
    this.seed = options.seed;
    this.goals = [];
    this.penalties = [];
    this.result;
    this.text;

    this.graph = [
        new NormalDistribution(this.mean + (this.ratingDifference * this.constant), this.sd),
        new NormalDistribution(this.mean - (this.ratingDifference * this.constant), this.sd)
    ];
}

(function (static_, proto_) {

    /*
     * Generates a match score from the given seed.
     */
    proto_.simulate = function () {
        this.goals[0] = this._goalsScored(null, 0);
        this.goals[1] = this._goalsScored(null, 1);
        this.penalties = [null, null];
        var extraTime = false;

        // If the match is a draw and extra time is enabled.
        if (this.extraTime && this.goals[0] === this.goals[1]) {
            extraTime = true;
            this.goals[0] += this._goalsScored(null, 0, 30);
            this.goals[1] += this._goalsScored(null, 1, 30);
        }

        // Calculate result
        if (this.goals[0] > this.goals[1]) {
            this.result = 0;
        }
        else if (this.goals[0] === this.goals[1]) {
            this.result = 0.5;
        }
        else {
            this.result = 1;
        }

        // If it's still and draw and penalties are enabled.
        if (this.penaltiesSet && this.goals[0] === this.goals[1]) {
            this.penalties = this._penalties();
        }

        if (this.penalties[0] > this.penalties[1]) {
            this.result = 0;
        }
        else if (this.penalties[1] > this.penalties[0]) {
            this.result = 1;
        }

        // Create the output text
        this.text = this._outputText(extraTime);

        return {
            score: this.goals,
            penalties: this.penalties,
            text: this.text,
            result: this.result
        };
    };


    /*
     * Finds the number of goals scored.
     */
    proto_._goalsScored = function (rand, team, time) {
        rand = rand || Math.random();
        time = time || 90;

        var graph = this.graph[team];
        var goals = 0;
        var xValue = -10;
        var mean = graph.mean;
        var standardDeviation = graph.standardDeviation;

        graph.mean = mean * (time / 90);
        graph.standardDeviation = standardDeviation * (time / 90);

        while (rand > graph.trapeziumRule(xValue, goals + 0.5, 0.1)) {
            goals += 1;
        }

        graph.mean = mean;
        graph.standardDeviation = standardDeviation;

        return goals;
    };

    /*
     * Method which generates the output string.
     */
    proto_._outputText = function (extraTime) {
        var text = this.team[0].stringName + ' ' + this.goals[0] + '-' + this.goals[1] + ' ' + this.team[1].stringName;

        if (extraTime) {
            text += ' (aet)';
        }

        if (this.penalties[0] !== null) {
            text += ' (' + this.penalties[0] + '-' + this.penalties[1] + ')';
        }

        return text;
    };

    /*
     * Penalty shootout simulation.
     */
    proto_._penalties = function () {
        var goals = [0, 0];
        var turns = [5, 5];

        while (true) {
            goals[0] += this._takePenalty();
            turns[0] -= 1;

            if (this._penaltiesWon(goals, turns)) {
                break;
            }

            goals[1] += this._takePenalty();
            turns[1] -= 1;

            if (this._penaltiesWon(goals, turns)) {
                break;
            }

            if (turns[0] === 0) {
                turns[0] = 1;
                turns[1] = 1;
            }
        }

        return goals;
    };

    /*
     * Checks to see if the penalty shootout has
     * ended.
     */
    proto_._penaltiesWon = function (goals, turns) {
        if (goals[0] - goals[1] > turns[1] || goals[1] - goals[0] > turns[0]) {
            return true;
        }

        return false;
    };

    /*
     * Gets a penalty goal.
     */
    proto_._takePenalty = function (rand) {
        rand = rand || Math.random();
        
        var threshold = 0.75;

        if (rand < threshold) {
            return 1;
        }

        return 0;
    };

}(Match, Match.prototype));

module.exports = Match;
