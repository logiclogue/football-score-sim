const trapeziumRule = require("./trapeziumRule");

// (Number -> Number) -> Number -> Number -> Number
function calculateArea(f, startX, endX) {
    return trapeziumRule(0.1, 2000, f, startX, endX);
}

module.exports = calculateArea;
