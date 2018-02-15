const _ = require("lodash");

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
}

module.exports = PenaltyShootout;
