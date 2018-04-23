class OccurrenceCollection {
    // Monoid a => a -> a -> a -> OccurrenceCollection
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
        return this.shotsOnTarget.append(this.shotsOffTarget);
    }

    // OccurrenceCollection ~> (a -> a) -> OccurrenceCollection
    map(f) {
        return new OccurrenceCollection(
            f(this.goals),
            this.shotsOnTargetNoGoal,
            this.shotsOffTarget
        );
    }
}

module.exports = OccurrenceCollection;
