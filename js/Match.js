var NormalDistribution = require('./NormalDistribution');


/*
 * Class which generates a football match score.
 */
function Match(teamA, teamB) {
    this.teamA = teamA;
    this.teamB = teamB;
    this.graph = new NormalDistribution(1.58, 1.23);
}

(function (static_, proto_) {

    /*
     * Generates a match score from the given seed.
     */
    proto_.result = function () {
        var teamAGoals = this._goalsScored();
        var teamBGoals = this._goalsScored();

        return [teamAGoals, teamBGoals];
    };


    /*
     * Finds the number of goals scored.
     */
    proto_._goalsScored = function (rand) {
        rand = rand || Math.random();

        var goals = 0;
        var xValue = -100;

        while (rand > this.graph.trapeziumRule(xValue, goals, 0.1)) {
            goals += 1;
        }

        return goals;
    };

}(Match, Match.prototype));

module.exports = Match;
