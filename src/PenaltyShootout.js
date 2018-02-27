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

    // PenaltyShootout ~> Seed -> PenaltyShootout
    attemptNext(seed) {
        const index = _.chain(this.record)
            .map((xs, i) => [i, xs.length])
            .minBy(pair => pair[1])
            .thru(pair => pair[0])
            .value();

        return this.attempt(index, seed);
    }

    // PenaltyShootout ~> [Number]
    get penaltiesTaken() {
        return this.record.map(xs => xs.length);
    }

    // PenaltyShootout ~> Boolean
    get isWin() {
        const max = _(this.penaltiesTaken).concat(5).max();
        const remaining = this.record.map(xs => max - xs.length);
        const winningScore = this.goals._.max();

        const winnable = _(remaining)
            .zip(this.goals.value)
            .map(_.sum)
            .map(x => x >= winningScore)
            .value();

        return !_.every(winnable);
    }

    // PenaltyShootout ~> Seed -> PenaltyShootout
    simulate(seed) {
        if (this.isWin) {
            return this;
        }

        return this
            .attemptNext(seed)
            .simulate(seed);
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
