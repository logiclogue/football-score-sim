var Period = require('./Period');
var Time = require('./Time');

function PeriodFactory() {
    
}

PeriodFactory.prototype = {

    create: function (teamA, teamB, timeLength, seed, previousPeriod, timeAfterPrevious) {
        $
    }

    createFirstHalf: function (seed, previousPeriod) {
        return new Period({
            timeLength: new Time(45 * 60 * 1000),
            seed: seed.append('firstHalf')
        });
    },

    createSecondHalf: function (seed, previousPeriod) {

    },

    createFirstHalfET: function (seed, previousPeriod) {

    },

    createSecondHalfET: function (seed, previousPeriod) {

    }

};

module.exports = PeriodFactory;
