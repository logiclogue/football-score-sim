var Match = require('./Match');
var ScheduleList = require('./ScheduleList');
var ScheduleListItem = require('./ScheduleListItem');


function LiveMatch(options) {
    Match.call(this, options);
    
    // Classses
    this.Match = options.Match || Match;
    this.ScheduleList = options.ScheduleList || ScheduleList;
    this.ScheduleListItem = options.ScheduleListItem || ScheduleListItem;

    // Instances
    this.goalList = new this.ScheduleList();

    // Variables
}

LiveMatch.prototype = Object.create(Match.prototype);

(function (proto_, super_) {

    proto_.simulate = function () {
        return super_.simulate.call(this);
    };

}(LiveMatch.prototype, Match.prototype));

module.exports = LiveMatch;
