var MatchTime = require('./MatchTime');

function NoPeriod() {
    
}

NoPeriod.prototype = {

    getRelativeTimeFromDate: function () {
        return new MatchTime(0, 0);
    }

};

module.exports = NoPeriod;
