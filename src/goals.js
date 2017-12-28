const normalDistribution = require("./normalDistribution");
const calculateArea = require("./calculateArea");

// Number -> Time -> Seed -> Integer
function goals(eloDifference, timeLength, seed) {
    const mean = 1.58;
    const f = graph(mean, 1.23, 0.00245, eloDifference, timeLength);

    return goals_(f, Math.random(), mean, 0);
}

function goals_(f, rand, mean, goalCount) {
    const area = calculateArea(f, mean - 10, goalCount + 0.5);

    if (rand > area) {
        return goals_(f, rand, mean, goalCount + 1);
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

module.exports = goals;
