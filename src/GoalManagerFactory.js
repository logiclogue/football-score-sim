var GoalManager = require('./GoalManager');

/*
 * Used to generate GoalManagers based on a particular goal manager.
 */
class GoalManagerFactory {
    getBeforeDate(goalManager, date) {
        var resultGoalManager = new GoalManager({
            teamA: goalManager.teams[0],
            teamB: goalManager.teams[1]
        });
        var time = date.getTime();

        goalManager.forEach(function (goal, teamIndex) {
            var goalTime = goal.date.getTime();
            var hasHappened = time >= goalTime;

            if (hasHappened) {
                resultGoalManager =
                    resultGoalManager.addGoals(teamIndex, [goal]);
            }
        });

        return resultGoalManager;
    }

    getBeforeNow(goalManager) {
        var date = new Date();

        return this.getBeforeDate(goalManager, date);
    }
}

module.exports = GoalManagerFactory;
