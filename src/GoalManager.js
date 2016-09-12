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
    
    /*
     * Appends goals, that are passed in, to the this.goals array, depending on
     * the team index given.
     */
    proto_.addGoals = function (teamIndex, goals) {
        var goalsArray = this.goals[teamIndex];

        goalsArray.push.apply(goalsArray, goals);
    };

    /*
     * Appends all the goals, from the passed in GoalManager, to the goals in
     * this instance of GoalManager.  Doesn't pass in if teams, in the passed
     * in GoalManager and current GoalManager instance, are different.
     */
    proto_.append = function (goalManager) {
        var isNotTeamA = goalManager.teams[0] !== this.teams[0];
        var isNotTeamB = goalManager.teams[1] !== this.teams[1];

        if (isNotTeamA || isNotTeamB) {
            throw new ReferenceError('teams are different');
        }

        this.addGoals(0, goalManager.goals[0]);
        this.addGoals(1, goalManager.goals[1]);
    };

}(GoalManager.prototype));

module.exports = GoalManager;
