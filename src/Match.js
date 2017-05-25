var Period = require('./Period');
var GoalManager = require('./GoalManager');
var Penalties = require('./Penalties');


/*
 * All encompassing class to create a football match.
 */
function Match(options) {
    // Instances
    this.teamA = options.teamA; // Team
    this.teamB = options.teamB; // Team

    var paramsGoalManager = {
        teamA: this.teamA,
        teamB: this.teamB
    };

    this.goalManager = new GoalManager(paramsGoalManager);
    this.normalTimeGoals = new GoalManager(paramsGoalManager);
    this.extraTimeGoals = new GoalManager(paramsGoalManager);
    this._everyGoal = new GoalManager(paramsGoalManager);

    this.firstHalf; // Period
    this.secondHalf; // Period
    this.extraTimeFirstHalf; // Period
    this.extraTimeSecondHalf; // Period
    this.penalties = new Penalties({
        teamA: this.teamA,
        teamB: this.teamB,
        seed: options.seed
    });
    
    // Variables
    this.extraTimeEnabled = options.extraTime || false;
    this.penaltiesEnabled = options.penalties || false;
    this.seed = options.seed || Date.now();
    this.wentToExtraTime = false;
    this.wentToPenalties = false;
    this.score = [];
    this.penaltiesScore = [];
    this.winner = null; // Team or null if draw

    //
    this._createHalfInstances();
}

(function (proto_) {

    /*
     * Simulates the whole match.
     * Returns the match score.
     */
    proto_.simulate = function () {
        this._simulateHalfs();
        this._appendGoals();
        this._checkOtherPeriods();
        this._setScores();
        this._calculateWinner();

        return this.score;
    };


    /*
     * Sets the local score properties with the scores from the goal managers.
     */
    proto_._setScores = function () {
        this.score = this.goalManager.getScore();
        this.penaltiesScore = this.penalties.goalManager.getScore();

        this._everyGoal.append(this.goalManager);
    };

    /*
     * Checks to see if the match is a draw and the other periods are enabled.
     * If so, it'll attach the goals of those periods onto the match.
     */
    proto_._checkOtherPeriods = function () {
        this._checkExtraTime();
        this._checkPenalties();
    };

    proto_._checkExtraTime = function () {
        if (this.extraTimeEnabled && this._isDraw()) {
            this.wentToExtraTime = true;
            this.goalManager.append(this.extraTimeGoals);
        }
    };

    proto_._checkPenalties = function () {
        if (this.penaltiesEnabled && this._isDraw()) {
            this.wentToPenalties = true;
            this.penalties.simulate();
            this._everyGoal.append(this.penalties.goalManager);
        }
    };

    /*
     * Runs the simulate method on each half.
     */
    proto_._simulateHalfs = function () {
        this.firstHalf.simulate();
        this.secondHalf.simulate();
        this.extraTimeFirstHalf.simulate();
        this.extraTimeSecondHalf.simulate();
    };

    /*
     * Appends the goals from each half, to their respective goal managers.
     */
    proto_._appendGoals = function () {
        this.normalTimeGoals.append(this.firstHalf.goalManager);
        this.normalTimeGoals.append(this.secondHalf.goalManager);
        this.extraTimeGoals.append(this.extraTimeFirstHalf.goalManager);
        this.extraTimeGoals.append(this.extraTimeSecondHalf.goalManager);

        this.goalManager.append(this.normalTimeGoals);
    };

    /*
     * Finds the winner of the match and puts their Team object in #winner.
     * Remains at null if it's a draw.
     */
    proto_._calculateWinner = function () {
        this.winner = this._everyGoal.getWinner();
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
        return new Period({
            teamA: this.teamA,
            teamB: this.teamB,
            length: minLength * 60000,
            seed: this.seed + ' ' + seed,
            startTime: new Date()
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
