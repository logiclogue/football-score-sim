var TrapeziumRule = require('./TrapeziumRule');

module.exports = {

    calculateArea: new TrapeziumRule(0.1, 10000).getArea,

};
