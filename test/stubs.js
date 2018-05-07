const Team = require("../src/Team");
const Match = require("../src/Match");
const Seed = require("../src/Seed");

const derby = new Team("Derby County", 1200);
const forest = new Team("Nottingham Forest", 1100);
const teams = [derby, forest];
const seed = "testing 1".toSeed();

const match = new Match(teams, seed);

const occurrenceCollection = match.occurrences;

module.exports = {
    derby: derby,
    forest: forest,
    teams: teams,
    seed: seed,
    match: match,
    occurrenceCollection: occurrenceCollection
};
