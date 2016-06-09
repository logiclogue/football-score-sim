var NormalDistribution = require('./NormalDistribution');


/*
 * Class which generates a football match score.
 */
function Match(teamA, teamB) {
    this.team = [teamA, teamB];
    this.ratingDifference = teamA.rating - teamB.rating;

    this.mean = 1.58;
    this.sd = 1.23;
    this.constant = 0.0025;

    this.graph = [
        new NormalDistribution(this.mean + (this.ratingDifference * this.constant), this.sd),
        new NormalDistribution(this.mean - (this.ratingDifference * this.constant), this.sd)
    ];
}

(function (static_, proto_) {

    /*
     * Generates a match score from the given seed.
     */
    proto_.result = function () {
        var teamAGoals = this._goalsScored(null, 0);
        var teamBGoals = this._goalsScored(null, 1);

        return [teamAGoals, teamBGoals];
    };


    /*
     * Finds the number of goals scored.
     */
    proto_._goalsScored = function (rand, team) {
        rand = rand || Math.random();

        var goals = 0;
        var xValue = -10;

        while (rand > this.graph[team].trapeziumRule(xValue, goals + 0.5, 0.1)) {
            goals += 1;
        }

        return goals;
    };

}(Match, Match.prototype));

module.exports = Match;
