var Period = require('./Period');
var GoalManager = require('./GoalManager');
var PenaltyShootout = require('./PenaltyShootout');
var Seed = require('./Seed');


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
    this.penaltyShootout; // PenaltyShootout
    
    // Variables
    this.extraTimeEnabled = options.extraTime || false;
    this.penaltyShootoutEnabled = options.penaltyShootout || false;
    this.seed = new Seed()
        .setValue(options.seed || Date.now());
    this.wentToExtraTime = false;
    this.wentToPenaltyShootout = false;
    this.score = [];
    this.penaltyShootoutScore = [];
    this.winner = null; // Team or null if draw
    this.startDate = options.startDate || new Date();
    this.finishDate;

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
        this.finishDate = this.getFinishDate();

        return this.score;
    };

    /*
     * Gets the finish time.
     */
    proto_.getFinishDate = function () {
        if (!this.wentToExtraTime && !this.wentToPenaltyShootout) {
            return this.secondHalf.finishDate;
        } else if (this.wentToExtraTime && !this.wentToPenaltyShootout) {
            return this.extraTimeSecondHalf.finishDate;
        }

        return this.penaltyShootout.finishDate;
    };


    /*
     * Sets the local score properties with the scores from the goal managers.
     */
    proto_._setScores = function () {
        this.score = this.goalManager.getScore();
        this.penaltyShootoutScore = this.penaltyShootout.goalManager.getScore();

        this._everyGoal.append(this.goalManager);
    };

    /*
     * Checks to see if the match is a draw and the other periods are enabled.
     * If so, it'll attach the goals of those periods onto the match.
     */
    proto_._checkOtherPeriods = function () {
        this._checkExtraTime();
        this._checkPenaltyShootout();
    };

    proto_._checkExtraTime = function () {
        if (this.extraTimeEnabled && this._isDraw()) {
            this.wentToExtraTime = true;
            this.goalManager.append(this.extraTimeGoals);
        }
    };

    proto_._checkPenaltyShootout = function () {
        if (this.penaltyShootoutEnabled && this._isDraw()) {
            this.wentToPenaltyShootout = true;
            this.penaltyShootout.simulate();
            this._everyGoal.append(this.penaltyShootout.goalManager);
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
        this.firstHalf = this._newHalf({
            seed: 'firstHalf',
            length: 45,
            endOfPrevious: this.startDate,
            lengthAfterPrevious: 0
        });

        this.secondHalf = this._newHalf({
            seed: 'secondHalf',
            length: 45,
            endOfPrevious: this.firstHalf.finishDate,
            lengthAfterPrevious: 15
        });

        this.extraTimeFirstHalf = this._newHalf({
            seed: 'extraTimeFirstHalf',
            length: 15,
            endOfPrevious: this.secondHalf.finishDate,
            lengthAfterPrevious: 5
        });

        this.extraTimeSecondHalf = this._newHalf({
            seed: 'extraTimeSecondHalf',
            length: 15,
            endOfPrevious: this.extraTimeFirstHalf.finishDate,
            lengthAfterPrevious: 5
        });

        this.penaltyShootout = this._createPenaltyShootout({
            endOfPrevious: this.extraTimeSecondHalf.finishDate,
            lengthAfterPrevious: 5
        });
    };

    /*
     * Creates a new half (instance of Period).
     */
    proto_._newHalf = function (options) {
        var startDate = this._dateMinutesAfter(
            options.endOfPrevious,
            options.lengthAfterPrevious
        );

        return new Period({
            teamA: this.teamA,
            teamB: this.teamB,
            length: options.length * 60000,
            seed: this.seed.clone().append(options.seed),
            startDate: startDate
        });
    };

    /*
     * Creates a penalty shootout.
     */
    proto_._createPenaltyShootout = function (options) {
        var startDate = this._dateMinutesAfter(
            options.endOfPrevious,
            options.lengthAfterPrevious
        );

        return new PenaltyShootout({
            teamA: this.teamA,
            teamB: this.teamB,
            seed: this.seed.clone().append(options.seed),
            startDate: startDate
        });
    }

    /*
     * Returns a `Date` that is so many minutes after the previous start time.
     */
    proto_._dateMinutesAfter = function (previousDate, minutes) {
        var date = new Date(previousDate.getTime());
        var previousMinutes = previousDate.getMinutes();

        date.setMinutes(previousMinutes + minutes);

        return date;
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
