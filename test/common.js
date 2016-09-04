var Team = require('../src/Team');
var Period = require('../src/Period');


module.exports = {
    teamEngland: new Team({
        name: 'England',
        rating: 1891
    }),
    teamSlovakia: new Team({
        name: 'Slovakia',
        rating: 1736
    }),

    fullMatchPeriod: new Period({
        length: 90 * 60 * 1000
    })
};
