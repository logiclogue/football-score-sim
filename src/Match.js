var Period = require('./Period');
var GoalManager = require('./GoalManager');


/*
 * All encompassing class to create a football match.
 */
function Match(options) {
    // Classes
    this.Period = options.Period;
    this.GoalManager = options.GoalManager;
    
    // Instances
    this.teamA = options.teamA;
    this.teamB = options.teamB;
    this.goalManager = new this.GoalManager({
        teamA: options.teamA,
        teamB: options.teamB
    });
    
    // Variables
    this.extraTime = options.extraTime || false;
    this.penalties = options.penalties || false;
}

(function (proto_) {

    /*
     * Simulates the whole match.
     * Returns the match score.
     */
    proto_.simulate = function () {
        
    };

}(Match.prototype));

module.exports = Match;
