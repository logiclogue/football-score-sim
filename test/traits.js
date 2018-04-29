const _ = require("lodash");

function hasProps(obj, props) {
    return _(props)
        .map(prop => _.hasIn(obj, prop))
        .reduce((a, b) => a && b, true);
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
    }
};
