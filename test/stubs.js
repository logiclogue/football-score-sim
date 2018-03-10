const Team = require("../src/Team");

const derby = new Team("Derby County", 1200);
const forest = new Team("Nottingham Forest", 1100);
const teams = [derby, forest];

module.exports = {
    derby: derby,
    forest: forest,
    teams: teams
}
