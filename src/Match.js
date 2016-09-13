var Period = require('./Period');
var GoalManager = require('./GoalManager');


/*
 * All encompassing class to create a football match.
 */
function Match(options) {
    // Classes
    this.Period = options.Period || Period;
    this.GoalManager = options.GoalManager || GoalManager;
    
    // Instances
    this.teamA = options.teamA;
    this.teamB = options.teamB;
    this.goalManager = new this.GoalManager({
        teamA: options.teamA,
        teamB: options.teamB
    });
    this.firstHalf = new this.Period({
        teamA: options.teamA,
        teamB: options.teamB,
        length: 45 * 60000,
        seed: 'firstHalf'
    });
    this.secondHalf = new this.Period({
        teamA: options.teamA,
        teamB: options.teamB,
        length: 45 * 60000,
        seed: 'secondHalf'
    });
    this.extraTimeFirstHalf = new this.Period({
        teamA: options.teamA,
        teamB: options.teamB,
        length: 15 * 60000,
        seed: 'extraTime firstHalf'
    });
    this.extraTimeSecondHalf = new this.Period({
        teamA: options.teamA,
        teamB: options.teamB,
        length: 15 * 60000,
        seed: 'extraTime secondHalf'
    });
    
    // Variables
    this.extraTime = options.extraTime || false;
    this.penalties = options.penalties || false;
    this.seed = options.seed;
}

(function (proto_) {

    /*
     * Simulates the whole match.
     * Returns the match score.
     */
    proto_.simulate = function () {
        this.firstHalf.simulate();
        this.secondHalf.simulate();
        this.extraTimeFirstHalf.simulate();
        this.extraTimeSecondHalf.simulate();

        this.goalManager.append(this.firstHalf.goalManager);
        this.goalManager.append(this.secondHalf.goalManager);
        this.goalManager.append(this.extraTimeFirstHalf.goalManager);
        this.goalManager.append(this.extraTimeSecondHalf.goalManager);

        return this.goalManager.getScore();
    };

}(Match.prototype));

module.exports = Match;
