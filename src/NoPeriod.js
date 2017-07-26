var Time = require('./Time');

function NoPeriod() {
    
}

NoPeriod.prototype = {

    getRelativeTimeFromDate: function () {
        return new Time(0);
    }

};

module.exports = NoPeriod;
