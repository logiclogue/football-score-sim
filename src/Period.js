var Goal = require('./Goal');


function Period(options) {
    // Classes
    this.Goal = options.Goal || Goal;

    // Variables
    this.length = options.length || 2700000; // or 45 minutes in milliseconds
    this.startTime = options.startTime || Date.now();
}

module.exports = Period;
