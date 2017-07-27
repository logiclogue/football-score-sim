var MatchTime = require('./MatchTime');

function NoPeriod() {
    
}

NoPeriod.prototype = {

    calculateMatchTime: function (date) {
        return new MatchTime(0, 0);
    }

};

module.exports = NoPeriod;
