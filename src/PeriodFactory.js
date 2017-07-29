var Period = require('./Period');
var Time = require('./Time');
var NoPeriod = require('./NoPeriod');

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
        var time = new Time();

        return new Period({
            teamA: this.teamA,
            teamB: this.teamB,
            seed: this.seed.append(options.seed),
            timeLength: time.setMinutes(options.minutesLength),
            previousPeriod: options.previousPeriod,
            startDate:
                time
                    .setMinutes(options.minutesAfterPrevious)
                    .addToDate(options.previousPeriod.finishDate)
        });
    },

    createFirstHalf: function (startDate) {
        var previousPeriod = new NoPeriod();

        previousPeriod.finishDate = startDate;

        return this.create({
            seed: 'firstHalf',
            minutesLength: 45,
            minutesAfterPrevious: 0,
            previousPeriod: previousPeriod
        });
    },

    createSecondHalf: function (previousPeriod) {
        return this.create({
            seed: 'secondHalf',
            minutesLength: 45,
            minutesAfterPrevious: 15,
            previousPeriod: previousPeriod
        });
    },

    createFirstHalfET: function (previousPeriod) {
        return this.create({
            seed: 'extraTimeFirstHalf',
            minutesLength: 15,
            minutesAfterPrevious: 5,
            previousPeriod: previousPeriod
        });
    },

    createSecondHalfET: function (previousPeriod) {
        return this.create({
            seed: 'extraTimeSecondHalf',
            minutesLength: 15,
            minutesAfterPrevious: 5,
            previousPeriod: previousPeriod
        });
    }

};

module.exports = PeriodFactory;
