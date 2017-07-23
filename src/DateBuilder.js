var Seed = require('./Seed');
var Time = require('./Time');
var iocConfig = require('./iocConfig');

function DateBuilder(options) {
    this.minMilliDelta = options.minMilliDelta || {
        isInfinite: true,
        value: 0
    };
    this.maxMilliDelta = options.maxMilliDelta || {
        isInfinite: true,
        value: 0
    };
    this.seed = new Seed();
    this.seed = options.seed ||
        new Seed()
            .setValue(this.meanDate.toString());
    this.calculateArea = options.calculateArea || iocConfig.calculateArea;
    this.dateQuantile = options.dateQuantile || iocConfig.dateQuantile;
}

(function (proto_) {

    proto_.getResult = function () {

    };
    
}(DateBuilder.prototype));

module.exports = DateBuilder;
