var NormalDistribution = require('../NormalDistribution');
var random = require('seeded-random');


/*
 * Class which generates a football match score.
 */
function Match(teamA, teamB, options) {
    options = options || {};

    this.period = {
        PRE_KICK_OFF: 0,
        FIRST_HALF: 1,
        HALF_TIME: 2,
        SECOND_HALF: 3,
        PRE_EXTRA_TIME: 4,
        EXTRA_TIME_FIRST_HALF: 5,
        EXTRA_TIME_HALF_TIME: 6,
        EXTRA_TIME_SECOND_HALF: 7,
        PRE_PENALTIES: 8,
        PENALTIES: 9,
        FULL_TIME: 10
    };
    this.team = [teamA, teamB];
    this.winner;
    this.ratingDifference = teamA.rating - teamB.rating;

    this.mean = 1.58;
    this.sd = 1.23;
    this.constant = 0.00245;

    this.extraTimeEnabled = options.extraTime || false;
    this.penaltiesEnabled = options.penalties || false;

    this.seed = options.seed || Math.random() + '';
    this.goals = [[], []];
    // 0 = team A win, 0.5 = draw, 1 = team B win.
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
        this.goals[0][this.period.PENALTIES] = null;
        this.goals[1][this.period.PENALTIES] = null;

        var extraTime = false;
        var penalties = this._penalties();

        // Loop through all of the teams and set
        // their goals scored.
        for (var i = 0; i < 2; i += 1) {
            this.goals[i][this.period.FIRST_HALF] = this._goalsScored(i, 0, 45);
            this.goals[i][this.period.SECOND_HALF] = this._goalsScored(i, 45, 90);
            this.goals[i][this.period.PENALTIES] = penalties[i];
            this.goals[i][this.period.FULL_TIME] = this.goals[i][this.period.FIRST_HALF] + this.goals[i][this.period.SECOND_HALF];

            // If the match is a draw and extra time is enabled.
            if (this.extraTimeEnabled && this.goals[0][this.period.FULL_TIME] === this.goals[1][this.period.FULL_TIME]) {
                extraTime = true;
                this.goals[i][this.period.EXTRA_TIME_FIRST_HALF] = this._goalsScored(i, 90, 105);
                this.goals[i][this.period.EXTRA_TIME_SECOND_HALF] = this._goalsScored(i, 105, 120);
                this.goals[i][this.period.FULL_TIME += this.goals[i][this.period.EXTRA_TIME_FIRST_HALF] + this.goals[i][this.period.EXTRA_TIME_SECOND_HALF]];
            }
        }

        // Calculate result. 1 = win, 0.5 = draw,
        // 0 = loss.
        if (this.goals[0][this.period.FULL_TIME] > this.goals[1][this.period.FULL_TIME]) {
            this.result = 0;
        }
        else if (this.goals[0][this.period.FULL_TIME] === this.goals[1][this.period.FULL_TIME]) {
            this.result = 0.5;
        }
        else {
            this.result = 1;
        }

        // If it's still a draw and penalties are enabled.
        if (this.penaltiesEnabled && this.goals[0][this.period.FULL_TIME] === this.goals[1][this.period.FULL_TIME]) {
            if (this.goals[0][this.period.PENALTIES] > this.goals[1][this.period.PENALTIES]) {
                this.result = 0;
            }
            else {
                this.result = 1;
            }
        }
        else {
            delete this.goals[0][this.period.PENALTIES];
            delete this.goals[1][this.period.PENALTIES];
        }
        

        this.winner = this._getWinner();

        // Create the output text
        this.text = this._outputText(extraTime);
    };


    /*
     * Finds the number of goals scored by a team.
     */
    proto_._goalsScored = function (team, startTime, endTime) {
        rand = random.decimal(this.seed + ' ' + team + ' ' + startTime + ' ' + endTime);
        time = endTime - startTime || 90;

        var graph = this.graph[team];
        var goals = 0;
        var mean = graph.mean;
        var xValue = -10 + mean;
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
     * Gets winner.
     */
    proto_._getWinner = function () {
        if (this.result !== 0.5) {
            return this.team[this.result];
        }

        return null;
    };

    /*
     * Method which generates the output string.
     */
    proto_._outputText = function (extraTime) {
        var text = this.team[0].stringName + ' ' + this.goals[0][this.period.FULL_TIME] + '-' + this.goals[1][this.period.FULL_TIME] + ' ' + this.team[1].stringName;

        if (extraTime) {
            text += ' (aet)';
        }

        if (this.penaltiesEnabled && this.goals[0][this.period.FULL_TIME] === this.goals[1][this.period.FULL_TIME]) {
            text += ' (' + this.goals[0][this.period.PENALTIES] + '-' + this.goals[1][this.period.PENALTIES] + ')';
        }

        return text;
    };

}(Match, Match.prototype));

module.exports = Match;
