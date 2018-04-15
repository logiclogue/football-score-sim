class OccurrenceCollection {
    // Monoid a => a -> a -> a -> a -> OccurrenceCollection
    constructor(goals, shotsOnTargetNoGoal, shotsOffTarget) {
        this.goals = goals;
        this.shotsOnTargetNoGoal = shotsOnTargetNoGoal;
        this.shotsOffTarget = shotsOffTarget;
    }

    // Monoid a => OccurrenceCollection ~> a
    get shotsOnTarget() {
        return this.goals.append(this.shotsOnTargetNoGoal);
    }

    // Monoid a => OccurrenceCollection ~> a
    get shots() {
        
    }
}

module.exports = OccurrenceCollection;
