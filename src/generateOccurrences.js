const normalDistribution = require("./normalDistribution");
const calculateArea = require("./calculateArea");

// Number -> Number -> (Number -> Time -> Seed -> Integer)
function occurrences(mean, sd) {
    const constant = 0.00245 / 1.23;
    const newConstant = constant * sd;

    return (eloDifference, timeLength, seed) => {
        const f = graph(mean, sd, newConstant, eloDifference, timeLength);
        const rand = updateSeed(seed, eloDifference, timeLength).decimal;

        return occurrences_(f, rand, mean, 0);
    };
}

function occurrences(mean, sd) {
    const constant = 0.00245 / 1.23;
    const newConstant = constant * sd;

    return (eloDifference, timeLength, seed) => {
        const decimal = timeLength.minutes / 90;
        const meanScaled = (mean + (newConstant * eloDifference)) * decimal;
        const sdScaled = sd * decimal
        const s = Math.sqrt((3 * Math.pow(sdScaled, 2)) / Math.pow(Math.PI, 2));
        const x = updateSeed(seed, eloDifference, timeLength).decimal;
        const output = meanScaled + (s * Math.log(x / (1 - x)));
        const goals = Math.round(output);

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
