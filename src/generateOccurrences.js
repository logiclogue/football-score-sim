const normalDistribution = require("./normalDistribution");
const calculateArea = require("./calculateArea");
const logit = require("./logitFunction");

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
    const constant = (0.00245 / 1.23) * sd;

    return (eloDifference, timeLength, seed) => {
        const meanScaled = scaleMean(constant, timeLength, eloDifference, mean);
        const sdScaled = scaleStandardDeviation(timeLength, sd);
        const x = updateSeed(seed, eloDifference, timeLength).decimal;
        const output = logit(sdScaled, meanScaled, x);
        const goals = Math.round(output);

        return goals <= 0 ? 0 : goals;
    };
}

// Number -> Time -> Number -> Number -> Number
function scaleMean(constant, timeLength, eloDifference, mean) {
    const ratio = timeToRatio(timeLength);

    return (mean + (constant * eloDifference)) * ratio;
}

// Time -> Number -> Number
function scaleStandardDeviation(timeLength, standardDeviation) {
    const ratio = timeToRatio(timeLength);

    return ratio * standardDeviation;
}

// Time -> Number
function timeToRatio(timeLength) {
    return timeLength.minutes / 90;
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
