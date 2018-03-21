const Match = require("../src/Match");
const Seed = require("../src/Seed");

// [Team] -> (Match -> Boolean) -> Match
function findMatch(teams, isMatch) {
    const seed = "testing".toSeed();

    return findMatchPrime(teams, seed, isMatch, 0);
}

// [Team] -> Seed -> (Match -> Boolean) -> Number -> Match
function findMatchPrime(teams, seed, isMatch, index) {
    const newSeed = seed.append(index);
    const match = new Match(teams, newSeed);

    if (isMatch(match)) {
        return match;
    }
    
    return findMatchPrime(teams, seed, isMatch, index + 1);
}

module.exports = findMatch;
