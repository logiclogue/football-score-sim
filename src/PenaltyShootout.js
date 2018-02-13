const _ = require("lodash");

class PenaltyShootout {
    // [[Boolean]] -> PenaltyShootout
    constructor(record) {
        this.record = record || [];
    }

    // PenaltyShootout ~> Number -> PenaltyShootout
    attempt(index) {
        const record = this.record.map((teamRecord, i) => {
            if (i === index) {
                return _.concat(teamRecord || [], true);
            }

            return teamRecord;
        });

        return new PenaltyShootout(record);
    }
}

module.exports = PenaltyShootout;
