const _ = require("lodash");

function hasProps(obj, props) {
    return _(props)
        .map(prop => _.hasIn(obj, prop))
        .thru(isAll)
        .value();
}

function isAll(booleans) {
    return _.reduce(booleans, (a, b) => a && b, true);
}

module.exports = {
    isFunctor: function (obj) {
        return _.hasIn(obj, [
            'map'
        ]);
    },

    isMonoid: function (obj) {
        return hasProps(obj, [
            'append'
        ]);
    },

    isMatch: function (obj) {
        return hasProps(obj, [
            'teams',
            'home',
            'away',
            'ratings',
            'isExtraTime',
            'isPenaltyShootout',
            'winner',
            'isDraw',
            'periods',
            'occurrences'
        ]);
    },

    isZippable: function (obj) {
        return hasProps(obj, [
            'zip'
        ]);
    },

    isOccurrenceCollection: function (obj) {
        return isAll([
            hasProps(obj, [
                'goals',
                'shotsOnTargetNoGoal',
                'shotsOffTarget',
                'shotsOnTarget',
                'shots'
            ]),
            this.isMonoid(obj),
            this.isFunctor(obj)
        ]);
    }
};
