var Period = require('./Period');
var Time = require('./Time');

function PeriodFactory() {
    this.teamA;
    this.teamB;
    this.seed;
}

PeriodFactory.prototype = {

    setTeamA: function (teamA) {
        var periodFactory = new PeriodFactory();

        periodFactory.teamA = teamA;
        periodFactory.teamB = this.teamB;
        periodFactory.seed = this.seed;

        return periodFactory;
    },

    setTeamB: function (teamB) {
        var periodFactory = new PeriodFactory();

        periodFactory.teamA = this.teamA;
        periodFactory.teamB = teamB;
        periodFactory.seed = this.seed;

        return periodFactory;
    },

    setSeed: function (seed) {
        var periodFactory = new PeriodFactory();

        periodFactory.teamA = this.teamA;
        periodFactory.teamB = this.teamB;
        periodFactory.seed = seed;

        return periodFactory;
    },

    create: function (options) {
        return new Period({
            timeLength: new Time().setMinutes(options.minutesLength),
            previousPeriod: options.previousPeriod
        });
    },

    createFirstHalf: function (seed, previousPeriod) {
        return new Period({
            timeLength: new Time().setMinutes(45),
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
