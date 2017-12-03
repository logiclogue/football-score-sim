var GoalManager = require('./GoalManager');

/*
 * Used to generate GoalManagers based on a particular goal manager.
 */
function GoalManagerFactory() {

}

(function (proto_) {

    proto_.getBeforeDate = function (goalManager, date) {
        var resultGoalManager = new GoalManager({
            teamA: goalManager.teams[0],
            teamB: goalManager.teams[1]
        });
        var time = date.getTime();

        goalManager.goals.forEach(function (goals, teamIndex) {
            goals.forEach(function (goal) {
                var goalTime = goal.date.getTime();
                var hasHappened = time >= goalTime;

                if (hasHappened) {
                    resultGoalManager =
                        resultGoalManager.addGoals(teamIndex, [goal]);
                }
            });
        });

        return resultGoalManager;
    };

    proto_.getBeforeNow = function (goalManager) {
        var date = new Date();

        return this.getBeforeDate(goalManager, date);
    };
    
}(GoalManagerFactory.prototype));

module.exports = GoalManagerFactory;
