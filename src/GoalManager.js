/*
 * Manages the goals scored, using an array containing the goals of the two
 * teams. Team A index 0, and Team B index 1.
 */
function GoalManager(options) {
    // Classes
    
    // Instances
    this.teams = [
        options.teamA,
        options.teamB
    ];
    this.goals = [
        [],
        []
    ];
    this.period = options.period;

    // Variables
}

(function (proto_) {
    
    proto_.addGoals = function () {

    };

}(GoalManager.prototype));

module.exports = GoalManager;
