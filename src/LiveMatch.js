var Match = require('./Match');
var ScheduleList = require('./ScheduleList');
var ScheduleListItem = require('./ScheduleListItem');


function LiveMatch(options) {
    Match.call(this, options);
    
    // Instances
    this.goalList = new ScheduleList();

    // Variables
    this.score = [];
    this.penaltiesScore = [];
}

LiveMatch.prototype = Object.create(Match.prototype);

(function (proto_, super_) {

    proto_.simulate = function () {
        var returnVal = super_.simulate.call(this);

        return returnVal;
    };

}(LiveMatch.prototype, Match.prototype));

module.exports = LiveMatch;
