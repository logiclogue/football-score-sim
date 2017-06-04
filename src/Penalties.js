var random = require('seeded-random');
var GoalManager = require('./GoalManager');
var Goal = require('./Goal');


/*
 * Simulates the penalty shootout.
 */
function Penalties(options) {
    // Instances
    this.random = options.random || random;
    this.goalManager = new GoalManager({
        teamA: options.teamA,
        teamB: options.teamB
    });
    
    // Variables
    this.teams = [
        options.teamA,
        options.teamB
    ];
    this.seed = options.seed || Math.random();
    this.seed += ' penalties';
    this.goalOrder = [[], []];
    this.turnsLeft = [5, 5];
    this.constant = 0.75;
    this.startTime = options.startTime || new Date();
    this.finishTime;
}

(function (static_, proto_) {
    
    /*
     * Main method that is called to simulate the
     * penalty shootout.
     */
    proto_.simulate = function () {
        var won = false;
        var i;
        var turn = 0;

        while (!won) {
            for (i = 0; i < 2 && !won; i += 1) {
                this.takePenalty(i, turn);

                won = this.hasFinished();
            }

            if (this.turnsLeft[0] === 0 && !won) {
                this.turnsLeft[0] = 1;
                this.turnsLeft[1] = 1;
            }

            turn += 1;
        }
    };

    /*
     * Simulates a single penalty kick.
     */
    proto_.takePenalty = function (teamIndex, turn) {
        var seed = this.seed + ' ' + teamIndex + ' ' + turn;
        var rand = this.random.decimal(seed);

        this.turnsLeft[teamIndex] -= 1;
        
        // Penalty is scored
        if (rand < this.constant) {
            this.scorePenalty(teamIndex, turn);

            return true;
        }

        // Penalty is missed
        this.missPenalty(teamIndex, turn);

        return false;
    };

    /*
     * Scores a goal for the team selected by the teamIndex.
     */
    proto_.scorePenalty = function (teamIndex, turn) {
        var team = this.teams[teamIndex];
        var goal = new Goal({
            time: this._getGoalTime(teamIndex, turn),
            team: team,
            period: this
        });

        // Adds the goal to the goal manager
        this.goalManager.addGoals(teamIndex, [goal]);
        // Adds the goal to the penalty order
        this.goalOrder[teamIndex][turn] = true;
        // Sets the finish time to the current goal
        this.finishTime = goal.time;
    };

    /*
     * Misses a penalty for the team selected by the teamIndex.
     */
    proto_.missPenalty = function (teamIndex, turn) {
        // Adds the miss to the penalty order
        this.goalOrder[teamIndex][turn] = false;
    };

    /*
     * Returns a boolean whether the match is finished or not.
     */
    proto_.hasFinished = function () {
        var teamAWon = this.hasTeamWon(0);
        var teamBWon = this.hasTeamWon(1);

        return teamAWon || teamBWon;
    };

    /*
     * Returns a boolean whether the team has won or not. teamIndex is the
     * index of the team to query.
     */
    proto_.hasTeamWon = function (teamIndex) {
        var otherIndex = 0;
        var goalDifference;
        var teamGoals;
        var otherGoals;
        var score;

        if (teamIndex === 0) {
            otherIndex = 1;
        }

        score = this.goalManager.getScore();
        goalDifference = score[teamIndex] - score[otherIndex];

        return goalDifference > this.turnsLeft[otherIndex];
    };

    /*
     * Returns the goal time.
     */
    proto_._getGoalTime = function (teamIndex, turn) {
        var timeBetweenGoals = 60000;
        var turnsAfterStart = (turn * 2) + teamIndex + 1;
        var timeAfterStart = timeBetweenGoals * turnsAfterStart;
        var time = this.startTime.getTime() + timeAfterStart;

        return new Date(time);
    };

}(Penalties, Penalties.prototype));

module.exports = Penalties;
