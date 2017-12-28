const roundValue = require("./roundValue");

// Number -> Number -> (Number -> Number) -> Number -> Number
function trapeziumRule(width, precision, f, startX, endX) {
    var startY = f(startX);
    var endY = f(endX);
    var x;
    var ySum = 0;
    var result;

    for (x = startX + width; x < endX; x += width) {
        x = roundValue(x, precision);

        ySum += f(x);
    }

    return 0.5 * width * (startY + endY + (2 * ySum));
}

module.exports = trapeziumRule;
