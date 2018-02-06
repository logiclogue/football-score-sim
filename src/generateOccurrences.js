const normalDistribution = require("./normalDistribution");
const calculateArea = require("./calculateArea");

// Number -> Number -> (Number -> Time -> Seed -> Integer)
function occurrences(mean, sd) {
    const constant = 0.00245 / 1.23;
    const newContant = constant * sd;

    return (eloDifference, timeLength, seed) => {
        const f = graph(mean, sd, newContant, eloDifference, timeLength);
        const rand = updateSeed(seed, eloDifference, timeLength).decimal;

        return occurrences_(f, rand, mean, 0);
    };
}

function occurrences(mean, sd) {
    const constant = 0.00245 / 1.23;
    const newContant = constant * sd;

    return (eloDifference, timeLength, seed) => {
        const newMean = mean + (constant * eloDifference);
        const s = Math.sqrt((3 * Math.pow(sd, 2)) / Math.pow(Math.PI, 2));
        const x = updateSeed(seed, eloDifference, timeLength).decimal;
        const output = newMean + (s * Math.log(x / (1 - x)));
        const goals = Math.floor(output);

        return goals < 0 ? 0 : goals;
    };
}

// (Number -> Number) -> Number -> Number -> Number -> Number
function occurrences_(f, rand, mean, goalCount) {
    const area = calculateArea(f, mean - 20, goalCount + 0.5);

    if (rand > area) {
        return occurrences_(f, rand, mean, goalCount + 1);
    }

    return goalCount;
}

// Number -> Number -> Number -> Number -> Time -> (Number -> Number)
function graph(mean, standardDeviation, constant, eloDifference, timeLength) {
    mean = mean + (constant * eloDifference);

    const decimal = timeLength.minutes / 90;

    const meanScaled = mean * decimal;
    const sdScaled = standardDeviation * decimal;

    return x => normalDistribution(meanScaled, sdScaled, x);
}

// Seed -> Number -> Time -> Seed
function updateSeed(seed, eloDifference, timeLength) {
    return seed
        .append(eloDifference)
        .append(timeLength.milliseconds);
}

module.exports = occurrences;
