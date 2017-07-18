var TrapeziumRule = require('./TrapeziumRule');

module.exports = {

    calculateArea: (function () {
        var trapeziumRule = new TrapeziumRule(0.1, 10000);
        var getArea = trapeziumRule.getArea.bind(trapeziumRule);

        return getArea;
    }())

};
