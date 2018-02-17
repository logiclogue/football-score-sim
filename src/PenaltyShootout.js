const _ = require("lodash");
const Seed = require("./Seed");

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
