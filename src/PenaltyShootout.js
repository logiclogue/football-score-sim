const _ = require("lodash");
const Seed = require("./Seed");
const Occurrences = require("./Occurrences");

class PenaltyShootout {
    // [[Boolean]] -> PenaltyShootout
    constructor(record) {
        this.record = record || [[], []];
    }

    // PenaltyShootout ~> Number -> Boolean -> PenaltyShootout
    add(index, value) {
        const record = this.record.map((teamRecord, i) => {
            if (i === index) {
                return _.concat(teamRecord, value);
            }

            return teamRecord;
        });

        return new PenaltyShootout(record);
    }

    // PenaltyShootout ~> Number -> Seed -> PenaltyShootout
    attempt(index, seed) {
        const updatedSeed = seed.append(this.record);

        return this.add(index, updatedSeed.decimal < 0.75);
    }

    // PenaltyShootout ~> [Number]
    get penaltiesTaken() {
        return this.record.map(xs => xs.length);
    }

    // PenaltyShootout ~> [Number]
    get attemptsRemaining() {
        const max = _(this.penaltiesTaken).concat(5).max();
        const allEqual = _.reduce(this.penaltiesTaken, (b, a) => b === a);
        const remaining;

        if (this.goals.isDraw && allEqual && max > 5) {
            return [1, 1];
        }

        return _(this.record)
            .map(xs => max - xs.length)
            .value();
    }

    // PenaltyShootout ~> Boolean
    get isWin() {
        return _.every(this.attemptsRemaining, remaining => remaining === 0);
    }

    // PenaltyShootout ~> Seed -> PenaltyShootout
    simulate(seed) {
        const result = _(this.record)
            .map((x, i) => i)
            .reduce((record, i) => record.attempt(i, seed), this);

        //if (this.isWin) {
            return result;
        //}

        return result.simulate(seed);
    }

    // PenaltyShoot ~> Occurrences
    get goals() {
        return _(this.record)
            .map(xs => _.filter(xs, y => y === true))
            .map(xs => xs.length)
            .toOccurrences();
    }
}

// Number -> PenaltyShootout
PenaltyShootout.empty = function (count) {
    const record = _.chain('_')
        .repeat(count)
        .map(x => [])
        .value();

    return new PenaltyShootout(record);
};

module.exports = PenaltyShootout;
