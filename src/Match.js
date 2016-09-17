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
        teamA: this.teamA,
        teamB: this.teamB
    });
    this.normalTimeGoals = new this.GoalManager({
        teamA: this.teamA,
        teamB: this.teamB
    });
    this.extraTimeGoals = new this.GoalManager({
        teamA: this.teamA,
        teamB: this.teamB
    });
    this.firstHalf; // Period
    this.secondHalf; // Period
    this.extraTimeFirstHalf; // Period
    this.extraTimeSecondHalf; // Period

    
    // Variables
    this.extraTime = options.extraTime || false;
    this.penalties = options.penalties || false;
    this.seed = options.seed || Date.now();
    this.wentToExtraTime = false;

    //
    this._createHalfInstances();
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

        this.normalTimeGoals.append(this.firstHalf.goalManager);
        this.normalTimeGoals.append(this.secondHalf.goalManager);
        this.extraTimeGoals.append(this.extraTimeFirstHalf.goalManager);
        this.extraTimeGoals.append(this.extraTimeSecondHalf.goalManager);

        this.goalManager.append(this.normalTimeGoals);

        if (this.extraTime && this._isDraw()) {
            this.wentToExtraTime = true;
            this.goalManager.append(this.extraTimeGoals);
        }

        return this.goalManager.getScore();
    };


    /*
     * Creates the instances for each half in the game.
     */
    proto_._createHalfInstances = function () {
        this.firstHalf = this._newHalf('firstHalf', 45);
        this.secondHalf = this._newHalf('secondHalf', 45);
        this.extraTimeFirstHalf = this._newHalf('extraTimeFirstHalf', 15);
        this.extraTimeSecondHalf = this._newHalf('extraTimeSecondHalf', 15);
    };

    /*
     * Creates a new half (instance of Period).
     */
    proto_._newHalf = function (seed, minLength) {
        return new this.Period({
            teamA: this.teamA,
            teamB: this.teamB,
            length: minLength * 60000,
            seed: this.seed + ' ' + seed,
            startTime: 1000
        });
    };

    /*
     * Returns a boolean, whether the match is a draw or not.
     */
    proto_._isDraw = function () {
        var score = this.goalManager.getScore();

        return score[0] === score[1];
    };

}(Match.prototype));

module.exports = Match;
