/*
 * Manages the goals scored, using an array containing the goals of the two
 * teams. Team A index 0, and Team B index 1.
 */
class GoalManager {
    constructor(options) {
        this.teams = [
            options.teamA,
            options.teamB
        ];
        this.goals = [
            [],
            []
        ];
    }

    /*
     * Appends goals, that are passed in, to the this.goals array, depending on
     * the team index given.
     */
    addGoals(teamIndex, goals) {
        var goalManager = new GoalManager({
            teamA: this.teams[0],
            teamB: this.teams[1]
        });

        goalManager.goals = this.goals
            .map((theseGoals, index) => {
                if (index === teamIndex) {
                    return theseGoals.concat(goals);
                }

                return theseGoals
            });

        return goalManager;
    }

    /*
     * Appends all the goals, from the passed in GoalManager, to the goals in
     * this instance of GoalManager.  Doesn't pass in if teams, in the passed
     * in GoalManager and current GoalManager instance, are different.
     */
    append(goalManager) {
        var isNotTeamA = goalManager.teams[0] !== this.teams[0];
        var isNotTeamB = goalManager.teams[1] !== this.teams[1];

        if (isNotTeamA || isNotTeamB) {
            throw new ReferenceError('teams are different');
        }

        return this
            .addGoals(0, goalManager.goals[0])
            .addGoals(1, goalManager.goals[1]);
    }

    /*
     * Returns the score of the match as an array: [team A goals, team B
     * goals].
     */
    getScore() {
        return [
            this.goals[0].length,
            this.goals[1].length
        ];
    }

    /*
     * Gets the winner, returning their Team object. Returns null if draw.
     */
    getWinner() {
        var goals = this.goals;

        if (goals[0] > goals[1]) {
            return this.teams[0];
        } else if (goals[1] > goals[0]) {
            return this.teams[1];
        }

        return null;
    }

    /*
     * For each loop for every goal scored.
     */
    forEach(callback) {
        this.goals[0].forEach(callback);
        this.goals[1].forEach(callback);
    }
}

module.exports = GoalManager;
