class OccurrenceCollection {
    // a -> a -> a -> OccurrenceCollection a
    constructor(goals, shotsOnTargetNoGoal, shotsOffTarget) {
        this.goals = goals;
        this.shotsOnTargetNoGoal = shotsOnTargetNoGoal;
        this.shotsOffTarget = shotsOffTarget;
    }

    // Monoid a => OccurrenceCollection a ~> a
    get shotsOnTarget() {
        return this.goals.append(this.shotsOnTargetNoGoal);
    }

    // Monoid a => OccurrenceCollection a ~> a
    get shots() {
        return this.shotsOnTarget.append(this.shotsOffTarget);
    }

    // Monoid a => OccurrenceCollection a ~> OccurrenceCollection a -> OccurrenceCollection a
    append(collection) {
        return new OccurrenceCollection(
            this.goals.append(collection.goals),
            this.shotsOnTargetNoGoal.append(collection.shotsOnTargetNoGoal),
            this.shotsOffTarget.append(collection.shotsOffTarget)
        );
    }

    // OccurrenceCollection a ~> (a -> b) -> OccurrenceCollection b
    map(f) {
        return new OccurrenceCollection(
            f(this.goals),
            f(this.shotsOnTargetNoGoal),
            f(this.shotsOffTarget)
        );
    }
}

module.exports = OccurrenceCollection;
