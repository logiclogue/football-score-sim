class OccurrenceCollection {
    // Monoid a => a -> a -> a -> a -> OccurrenceCollection
    constructor(goals, shotsOnTargetNoGoal, shotsOffTarget, shots) {
        this.goals = goals;
        this.shotsOnTargetNoGoal = shotsOnTargetNoGoal;
        this.shotsOffTarget = shotsOffTarget;
        this.shots = shots;
    }

    // Monoid a => OccurrenceCollection ~> a
    get shotsOnTarget() {

    }
}

module.exports = OccurrenceCollection;
