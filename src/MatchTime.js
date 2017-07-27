var Time = require('./Time');

function MatchTime(normalTimeComponent, injuryTimeComponent) {
    this.normalTimeComponent = normalTimeComponent || new Time(0);
    this.injuryTimeComponent = injuryTimeComponent || new Time(0);
}

MatchTime.prototype = {

    getNormalTime: function () {
        return this.normalTimeComponent;
    },

    getInjuryTime: function () {
        return this.injuryTimeComponent;
    },

    getTime: function () {
        var injuryTime = this.injuryTimeComponent;
        var sumTime = this.normalTimeComponent.addTime(injuryTime);

        return sumTime;
    }
    
};

module.exports = MatchTime;
