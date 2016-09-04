var Goal = require('./Goal');
var TeamGoals = require('./TeamGoals');


function Period(options) {
    // Classes
    this.Goal = options.Goal || Goal;
    this.TeamGoals = options.TeamGoals || TeamGoals;

    // Variables
    this.length = options.length || 2700000; // or 45 minutes in milliseconds
    this.startTime = options.startTime || Date.now();
    /*this.goals = [
        new options.TeamGoals(options),
        new options.TeamGoals(options)
    ];*/
}

module.exports = Period;
